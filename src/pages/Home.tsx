import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home(task:Task) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim() != '') {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks([...tasks, data]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const selectedTasks = tasks.map((task:Task) => {
      const isTaskDone =
      task.id === id && task.done
          ? { ...task, done: false }
          : task.id === id && !task.done
          ? { ...task, done: true }
          : { ...task };
      return isTaskDone;
    });

    setTasks(selectedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task:Task) => task.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}