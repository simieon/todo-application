<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    App\Http\Middleware\LogRequest::class
]);

Route::get("/todo", [TodoController::class, "getAll"]);
Route::get("/todo/{id}", [TodoController::class, "getTodoById"]);
Route::post("/todo", [TodoController::class, "storeTodo"]);
Route::delete("/todo/{id}", [TodoController::class, "destroyTodo"]);
Route::patch("/todo/{id}", [TodoController::class, "toggleCompleted"]);