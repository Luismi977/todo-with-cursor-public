"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Pencil, Check, X } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTask = () => {
    if (newTask.trim() === "") return

    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEdit = (task: Task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id: number) => {
    if (editText.trim() === "") return

    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)))
    setEditingId(null)
    setEditText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-foreground">📝 Mis Tareas</h1>
          <p className="text-center text-muted-foreground mt-2">Organiza tu día de manera efectiva</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Add Task Form */}
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Escribe una nueva tarea..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask} className="px-6">
                Agregar
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">No hay tareas todavía</p>
                  <p className="text-sm mt-2">¡Agrega tu primera tarea arriba!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleComplete(task.id)}
                      className="flex-shrink-0"
                    />

                    {editingId === task.id ? (
                      <Input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(task.id)
                          if (e.key === "Escape") cancelEdit()
                        }}
                        className="flex-1"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-1 ${
                          task.completed ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {task.text}
                      </span>
                    )}

                    <div className="flex gap-2 flex-shrink-0">
                      {editingId === task.id ? (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => saveEdit(task.id)} className="h-8 w-8">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit} className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => startEdit(task)} className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteTask(task.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Task Counter */}
            {tasks.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total: {tasks.length} tareas</span>
                  <span>Completadas: {tasks.filter((t) => t.completed).length}</span>
                  <span>Pendientes: {tasks.filter((t) => !t.completed).length}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Mi Lista de Tareas - Mantén tu productividad al máximo
          </p>
        </div>
      </footer>
    </div>
  )
}
