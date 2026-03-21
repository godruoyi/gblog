/**
 * Cloudflare Pages Function: Get Gallery Items
 *
 * GET /api/gallery
 *
 * Response:
 *   - 200: [{ id, title, description, image, createdAt }]
 *   - 500: { error: string }
 */

export async function onRequest(context) {
    const { request, env } = context

    if (request.method !== 'GET') {
        return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    try {
        const galleryData = await env.GALLERY.get('gallery-items', { type: 'json' })
        if (!galleryData || galleryData.length === 0) {
            return jsonResponse([])
        }

        const sortedData = galleryData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return jsonResponse(sortedData)
    } catch (error) {
        console.error('❌ Error fetching gallery items:', error)
        return jsonResponse({
            error: 'Failed to fetch gallery items'
        }, 500)
    }
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60',
        }
    })
}
