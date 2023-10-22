<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function getAll()
    {
        try {
            $todos = Todo::all();
            return response()->json($todos, 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. " . $th->getMessage()], 500);
        }
    }

    public function getTodoById(int $id)
    {
        try {
            $todo = Todo::find($id);

            if (!$todo) {
                return response()->json(['message' => 'Todo not found'], 404);
            }

            return response()->json($todo, 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. " . $th->getMessage()], 500);
        }
    }

    public function storeTodo(Request $request)
    {
        try {
            $data = $request->only(['title', 'completed']);
            return response()->json(['message'=> 'Successfully added', 'instance' => Todo::create($data)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. " . $th->getMessage()], 500);
        }
    }

    public function toggleCompleted(int $id)
    {
        try {
            $todo = Todo::find($id);
    
            if (!$todo) {
                return response()->json(['message' => 'Todo not found'], 404);
            }
    
            $todo->update(['completed' => !$todo->completed]);
    
            return response()->json(['message' => 'Todo updated successfully', 'instance' => $todo], 200);

        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. " . $th->getMessage()], 500);
        }
    }

    public function destroyTodo(int $id)
    {
        try {
            $todo = Todo::find($id);
    
            if (!$todo) {
                return response()->json(['message' => 'Todo not found'], 404);
            }

            Todo::destroy($id);

            return response()->json(['message' => "Todo deleted successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. " . $th->getMessage()], 500);
        }
    }
}
