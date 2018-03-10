<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style >
        .sign {
            height: 100vh;
            min-height: 750px;
            text-align: center;
            font-size: 14px;
            background-color: #f1f1f1;
        }
        @font-face {
            font-family: 'iconfont';  /* project id 396123 */
            src: url('//at.alicdn.com/t/font_396123_lyg85g0278tfn7b9.eot');
            src: url('//at.alicdn.com/t/font_396123_lyg85g0278tfn7b9.eot?#iefix') format('embedded-opentype'),
            url('//at.alicdn.com/t/font_396123_lyg85g0278tfn7b9.woff') format('woff'),
            url('//at.alicdn.com/t/font_396123_lyg85g0278tfn7b9.ttf') format('truetype'),
            url('//at.alicdn.com/t/font_396123_lyg85g0278tfn7b9.svg#iconfont') format('svg');
        }
        .iconfont{
            font-family:"iconfont" !important;
            font-size:16px;font-style:normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }

        .main {
            width: 400px;
            margin: 60px auto 0;
            padding: 50px 50px 30px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 0 8px rgba(0,0,0,.1);
            vertical-align: middle;
            display: inline-block;
        }
    
        .login-container {

        }

        .restyle {
            margin-bottom: 0;
        }

        .restyle input {
            width: 100%;
            height: 50px;
            margin-bottom: 0;
            padding: 4px 12px 4px 35px;
            border: 1px solid #c8c8c8;
            border-radius: 0 0 4px 4px;
            background-color: hsla(0,0%,71%,.1);
            vertical-align: middle;
        }
        
        .sign-in-button {
            width: 100%;
            padding: 9px 18px;
            font-size: 18px;
            border: none;
            border-radius: 25px;
            color: #fff;
            background: #3194d0;
            cursor: pointer;
            outline: none;
            display: block;
            clear: both;
            margin-bottom: 30px;
        }
        
        .input-prepend {
            position: relative;
            width: 100%;
            margin-bottom: 20px;
        }
        .input-prepend input {
            width: 100%;
            height: 32px;
            margin-bottom: 0;
            padding: 4px 12px 4px 35px;
            border: 1px solid #c8c8c8;
            border-radius: 0 0 4px 4px;
            background-color: hsla(0,0%,71%,.1);
            vertical-align: middle;
        }
        .more-sign h6 {
            position: relative;
            margin: 0 0 20px;
            font-size: 12px;
            color: #b5b5b5;
        }
        
        .more-sign h6:before {
            content: "";
            border-top: 1px solid #b5b5b5;
            display: block;
            position: absolute;
            width: 60px;
            top: 5px;
            left: 30px;
        }
        .more-sign h6:after {
            content: "";
            border-top: 1px solid #b5b5b5;
            display: block;
            position: absolute;
            width: 60px;
            top: 5px;
            right: 30px;
        }
        .more-sign .github {
            background-color: #3e313d;
        }
        .title {
            margin: 0 auto 32px;
            padding: 10px;
            font-weight: 400;
            color: #969696;
        }
        .title .active {
            font-weight: 700;
            color: #ea6f5a;
            border-bottom: 2px solid #ea6f5a;
        }
        .title a {
            padding: 10px;
        }
        .sign form {
            margin-bottom: 30px;
            margin: 0 0 20px;
        }
    </style>
</head>
<body>
    <div class="sign">
        <div class="main">
            <h4 class="title">
                <router-link :to="'/auth/signin'" class="active">登录</router-link>
            </h4>
            <div class="login-container">
                <form action="">
                    <div class="input-prepend restyle">
                        <input placeholder="手机号或邮箱" type="text" name="name">
                    </div>
                    <div class="input-prepend">
                        <input placeholder="手机号或邮箱" type="text" name="name">
                    </div>
                    <input type="submit" name="commit" value="登录" class="sign-in-button">
                </form>
            </div>
        </div>
    </div>
</body>
</html>