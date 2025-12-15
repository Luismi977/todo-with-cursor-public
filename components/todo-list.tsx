"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Pencil, Check, X, Loader2 } from "lucide-react"
import { Task, createTask, getTasks, updateTask, deleteTask } from "@/lib/todos"

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al cargar tareas"
      console.error("Error cargando tareas:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async () => {
    if (newTask.trim() === "") return

    try {
      setIsAdding(true)
      setError(null)
      await createTask(newTask)
      // Recargar todas las tareas para mantener consistencia
      await loadTasks()
      setNewTask("")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al agregar tarea"
      console.error("Error agregando tarea:", error)
      setError(errorMessage)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      await loadTasks()
    } catch (error) {
      console.error("Error eliminando tarea:", error)
    }
  }

  const toggleComplete = async (task: Task) => {
    try {
      await updateTask(task.id, { completed: !task.completed })
      await loadTasks()
    } catch (error) {
      console.error("Error actualizando tarea:", error)
    }
  }

  const startEdit = (task: Task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = async (id: string) => {
    if (editText.trim() === "") return

    try {
      await updateTask(id, { text: editText })
      setEditingId(null)
      setEditText("")
      await loadTasks()
    } catch (error) {
      console.error("Error guardando tarea:", error)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
                onKeyDown={(e) => e.key === "Enter" && !isAdding && addTask()}
                className="flex-1"
                disabled={isAdding}
              />
              <Button onClick={addTask} className="px-6" disabled={isAdding}>
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  "Agregar"
                )}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">Error: {error}</p>
                <p className="text-xs text-destructive/70 mt-1">
                  Por favor, verifica que las variables de entorno de Firebase estén configuradas en Replit.
                </p>
              </div>
            )}

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
                      onCheckedChange={() => toggleComplete(task)}
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
                            onClick={() => handleDeleteTask(task.id)}
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
