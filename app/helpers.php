<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

if (!function_exists('console_error')) {
	function console_error(Illuminate\Console\Command $command, $string, $location = null): void
	{
		$bt = debug_backtrace();
		$caller = array_shift($bt);
		$length = Str::length(strip_tags($string)) + 4;

		if ($location) {
			$command->warn('In ' . $location . ' line ' . $caller['line'] . ':');
		}
		$command->line(str_repeat(' ', $length), 'error');
		$command->line('  ' . $string . '  ', 'error');
		$command->line(str_repeat(' ', $length), 'error');

		$command->newLine();
	}
}

if (!function_exists('console_success')) {
	function console_success(Illuminate\Console\Command $command, $string): void
	{
		$length = Str::length(strip_tags($string)) + 6;

		$command->line(str_repeat('█', $length), 'info');
		$command->line('   ' . $string . '   ', 'info');
		$command->line(str_repeat('█', $length), 'info');

		$command->newLine();
	}
}

if (!function_exists('console_display')) {
	function console_display(Illuminate\Console\Command $command, $string, $style = 'info'): void
	{
		$length = Str::length(strip_tags($string)) + 6;

		$command->line(str_repeat('=', $length), 'comment');
		$command->line('|  ' . $string . '  |', $style);
		$command->line(str_repeat('=', $length), 'comment');
	}
}

if (!function_exists('jsonResponse')) {
	function jsonResponse(int $code = 200, mixed $data = null, string|null $message = null): JsonResponse
	{
		$response_array = [
			"success" => $code >= 200 && $code < 300,
			'code' => $code
		];

		if (isset($data)) {
			$response_array['data'] = $data;
		}

		if (isset($message)) {
			$response_array['message'] = $message;
		}
		return response()->json($response_array, $code);
	}
}

if (!function_exists('successResponse')) {
	/**
	 * Returns a JSON response with a success status.
	 *
	 * @param mixed $data The data to be returned in the response.
	 * @param string|null $message An optional message to be included in the response.
	 * @param int $status_code The HTTP status code for the response. Defaults to 200.
	 * @return JsonResponse The resulting JSON response.
	 */
	function successResponse(mixed $data = null, string $message = null, int $status_code = Response::HTTP_OK): JsonResponse
	{
		return jsonResponse($status_code, data: $data, message: $message);
	}
}

if (!function_exists('errorResponse')) {
	/**
	 * Returns a JSON response with an error status.
	 *
	 * @param string $message The error message to be included in the response.
	 * @param int $status_code The HTTP status code for the response.
	 * @param mixed $data Optional data to be included in the response.
	 * @return JsonResponse The resulting JSON response.
	 */
	function errorResponse(string $message, int $status_code, mixed $data = null): JsonResponse
	{
		return jsonResponse($status_code, data: $data, message: $message);
	}
}
