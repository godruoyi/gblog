server {
    listen 80;
    listen [::]:80;

    server_name admin.godruoyi.com;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443;      # ssl http2 fastopen=3 reuseport;
    listen [::]:443; # ssl http2 fastopen=3 reuseport;

    root /home/godruoyi/websites/admin.godruoyi.com/public;

    access_log /home/godruoyi/websites/admin.godruoyi.com/storage/logs/nginx-access.log;
    error_log  /home/godruoyi/websites/admin.godruoyi.com/storage/logs/nginx-error.log error;

    server_name admin.godruoyi.com;

    index index.php;

    client_max_body_size 20M;

    include snippets/fastcgi-php.conf;
    include snippets/ssl-params.conf;

    if ($host != 'admin.godruoyi.com' ) {
        rewrite ^/(.*)$ https://admin.godruoyi.com/$1 permanent;
    }
}