<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function stream(Request $request, string $path)
    {
        $fullPath = storage_path('app/public/videos/' . $path);
	
        
        if (!file_exists($fullPath)) {
            abort(404);
        }

        $size = filesize($fullPath);
        $range = $request->header('Range');

        if ($range) {
            $ranges = array_map('trim', explode('=', $range));
            $positions = array_map('trim', explode('-', $ranges[1]));
            
            $start = $positions[0];
            $end = isset($positions[1]) && $positions[1] !== '' ? $positions[1] : $size - 1;
            
            if ($start >= $size) {
                return response('', 416);
            }

            $length = $end - $start + 1;
            $stream = fopen($fullPath, 'rb');
            fseek($stream, $start);
            
            return response()->stream(function() use ($stream, $length) {
                echo fread($stream, $length);
                fclose($stream);
            }, 206, [
                'Content-Type' => 'video/mp4',
                'Content-Length' => $length,
                'Content-Range' => "bytes $start-$end/$size",
                'Accept-Ranges' => 'bytes',
            ]);
        }

        return response()->file($fullPath, [
            'Content-Type' => 'video/mp4',
            'Accept-Ranges' => 'bytes',
        ]);
    }
} 