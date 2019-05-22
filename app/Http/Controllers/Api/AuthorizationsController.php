<?php

namespace App\Http\Controllers\Api;

use Log;
use Exception;
use Socialite;
use App\Models\User;
use App\Models\GithubUser;
use Illuminate\Http\Request;
use App\Http\Requests\Api\SocialAuthorizationRequest;

class AuthorizationsController extends Controller
{
    /**
     * 当前允许登录的方式
     *
     * @var array
     */
    protected $allowedLogin = ['github', 'anonymous'];

    /**
     * Wechat login
     *
     * @param  Request $request
     * @return
     */
    public function socialLogin(SocialAuthorizationRequest $request, $type)
    {
        if (! in_array($type, $this->allowedLogin, true)) {
            return $this->response->errorBadRequest('无效的登录方式');
        }

        $method = $type . 'Login';

        return $this->{$method}($request);
    }

    /**
     * 尼玛登录
     *
     * @param  Request $request
     *
     * @return mixed
     */
    public function anonymousLogin(Request $request)
    {
        $user = GithubUser::create([
            'username' => '匿名用户',
            'nickname' => '匿名用户',
            'name'     => app('Faker\Generator')->name,
            'email'    => app('Faker\Generator')->safeEmail,
            'avatar'   => 'https://images.godruoyi.com/avatars/github/unknow_1536570935_CBDKowkcB6.png',
        ]);

        return $this->userToToken($user);
    }

    /**
     * Github 登陆
     *
     * @param  Request $request
     *
     * @return mixed
     */
    public function githubLogin(Request $request)
    {
        $driver = Socialite::driver('github');

        try {
            $token      = $driver->scopes([])->getAccessToken($request->code);
            $socialUser = $driver->user($token);
        } catch (Exception $e) {
            Log::error($e);

            return $this->response->errorUnauthorized('code 无效或已过期');
        }

        try {
            $userData = $socialUser->getOriginal() + [
                'username' => $socialUser->username,
                'nickname' => $socialUser->nickname ?: $socialUser->username,
                'name'     => $socialUser->name ?: $socialUser->username,
            ];

            $user = GithubUser::whereEmail($socialUser->email)->first();
            if (! $user) {
                $avatar = upload_github_avatar($socialUser->avatar, $socialUser->username);
                $userData['avatar'] = $avatar;

                $user = GithubUser::create($userData);
            } else {
                unset($userData['avatar']);

                $user->fill($userData)->save();
            }
        } catch (Exception $e) {
            Log::error($e);

            return $this->response->errorInternal('看样子发生了一个 bug');
        }

        return $this->userToToken($user);
    }

    /**
     * User to token
     *
     * @param  GithubUser $user
     *
     * @return [type]
     */
    private function userToToken($user)
    {
        $token = \Auth::guard('api')->fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'expires_in'   => \Auth::guard('api')->factory()->getTTL() * 60,

            'user'         => [
                'username'  => $user->username,
                'home_page' => $user->blog ?: $user->html_url,
                'avatar'    => $user->avatar
            ]
        ], 201);
    }
}
