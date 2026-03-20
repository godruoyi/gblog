/**
 * Cloudflare Pages Function: Upload Gallery Image
 *
 * POST /api/gallery/upload
 * Body: multipart/form-data
 *   - image: File
 *   - title: string (3-100 chars)
 *   - description: string (10-500 chars)
 *   - token: string
 *
 * Response:
 *   - 200: { success: true, item: {...} }
 *   - 400/401/500: { error: string }
 */

export async function onRequest(context) {
    const { request, env } = context

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    try {
        const formData = await request.formData()
        const image = formData.get('image')
        const title = formData.get('title')
        const description = formData.get('description')
        const uploadToken = formData.get('token')

        if (uploadToken !== env.CF_UPLOAD_TOKEN) {
            return jsonResponse({ error: 'Invalid upload token' }, 401)
        }

        if (!image || !title || !description) {
            return jsonResponse({
                error: 'Missing required fields (image, title, description)'
            }, 400)
        }

        if (title.length < 3 || title.length > 100) {
            return jsonResponse({
                error: 'Title must be 3-100 characters'
            }, 400)
        }

        if (description.length < 10 || description.length > 500) {
            return jsonResponse({
                error: 'Description must be 10-500 characters'
            }, 400)
        }

        if (!image.type.startsWith('image/')) {
            return jsonResponse({
                error: 'Invalid file type. Must be an image.'
            }, 400)
        }

        if (image.size > 20 * 1024 * 1024) {
            return jsonResponse({
                error: 'Image too large (max 20MB)'
            }, 400)
        }

        console.log(`📸 Processing upload: "${title}" (${(image.size / 1024 / 1024).toFixed(2)}MB)`)

        const uuid = crypto.randomUUID()
        const extension = getFileExtension(image.type)
        const filename = `gblog/images/gallery/${uuid}${extension}`

        console.log(`📁 Uploading to R2: ${filename}`)

        await env.R2_IMAGES.put(filename, image, {
            httpMetadata: {
                contentType: image.type,
            },
            customMetadata: {
                originalName: image.name || 'unknown',
                uploadedAt: new Date().toISOString(),
                title: title || 'Daily Life',
            }
        })

        console.log(`✅ R2 upload successful: ${filename}`)

        // generate Cloudflare Image Resizing URL
        // format: https://domain.com/cdn-cgi/image/width=1500,height=750,fit=cover,format=auto/path
        const cdnDomain = env.CDN_DOMAIN || 'images.godruoyi.com'
        const imageUrl = `https://${cdnDomain}/cdn-cgi/image/width=1500,height=750,fit=cover,format=auto/${filename}`

        console.log(`🖼️ Generated optimized URL: ${imageUrl}`)

        const existingData = await env.GALLERY.get('gallery-items', { type: 'json' }) || []

        const maxId = existingData.reduce((max, item) => {
            const num = Number.parseInt(item.id.replace('tab-', ''), 10)
            return num > max ? num : max
        }, 0)

        const newItem = {
            id: `tab-${maxId + 1}`,
            title: title.trim(),
            description: description.trim(),
            image: imageUrl,
            r2Path: filename,
            createdAt: new Date().toISOString()
        }

        existingData.push(newItem)
        const updatedData = existingData

        console.log(`➕ Added new item (total: ${existingData.length})`)

        await env.GALLERY.put('gallery-items', JSON.stringify(updatedData))
        console.log(`✅ KV updated successfully`)

        return jsonResponse({
            success: true,
            message: 'Gallery item added successfully',
            item: newItem,
            url: imageUrl,
            totalItems: updatedData.length
        })
    } catch (error) {
        console.error('❌ Upload error:', error)
        return jsonResponse({
            error: error.message || 'Internal server error'
        }, 500)
    }
}

function getFileExtension(mimeType) {
    const mimeMap = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/avif': '.avif',
        'image/heic': '.heic',
        'image/heif': '.heif',
    }
    return mimeMap[mimeType] || '.jpg'
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
}
