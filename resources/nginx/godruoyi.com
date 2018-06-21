server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name godruoyi.com www.godruoyi.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2 fastopen=3 reuseport default_server;
    listen [::]:443 ssl http2 fastopen=3 reuseport default_server;

    server_name www.godruoyi.com godruoyi.com;

    include snippets/fastcgi-php.conf;
    include snippets/ssl-params.conf;

    root /home/godruoyi/websites/godruoyi.com/public;

    access_log /home/godruoyi/websites/godruoyi.com/storage/logs/nginx-access.log;
    error_log  /home/godruoyi/websites/godruoyi.com/storage/logs/nginx-error.log error;

    index index.php;

    if ($host != 'godruoyi.com' ) {
        rewrite ^/(.*)$ https://godruoyi.com/$1 permanent;
    }
}