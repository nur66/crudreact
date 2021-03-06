<?php

use App\Http\Controllers\MahasiswaController;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mahasiswa', [MahasiswaController::class, 'get']);

Route::post('/mahasiswa', [MahasiswaController::class, 'post']);

Route::post('/mahasiswa/delete', [MahasiswaController::class, 'delete']);

Route::post('/mahasiswa/ubah', [MahasiswaController::class, 'put'] );