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
    protected $allowedLogin = ['github'];

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
            $user = GithubUser::updateOrCreate(['email' => $socialUser->email], $socialUser->getOriginal() + [
                'avatar'   => $socialUser->avatar,
                'username' => $socialUser->username,
                'nickname' => $socialUser->nickname,
                'name'     => $socialUser->name,
            ]);
        } catch (Exception $e) {
            Log::error($e);

            return $this->response->errorInternal('看样子发生了一个 bug');
        }

        $token = \Auth::guard('api')->fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'expires_in'   => \Auth::guard('api')->factory()->getTTL() * 60
        ], 201);
    }
}
