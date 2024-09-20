<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminVerify
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->bearerToken();

        if(!$token){
            return Response([
                "msg" => "No token provided"
            ], 401);
        }

        $user = User::where("remember_token", $token)->first();

        if(!$user){
            return Response([
                "msg" => "User not found"
            ], 404);
        }

        if(!($user->admin || $user->superadmin)){
            return Response([
                "msg" => "User is not a admin"
            ], 401);
        }

        return $next($request);
    }
}
