<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogRequest
{
    
    public function handle($request, Closure $next)
    {
        // Log request details
        Log::info('Request:', [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'headers' => $request->header(),
            'body' => $request->all(),
        ]);

        return $next($request);
    }
}
