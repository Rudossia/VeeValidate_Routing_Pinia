<template>
  <main class="app">
    <h1>Todo Routing</h1>

    <nav>
      <RouterLink to="/">Tasks</RouterLink>
      <RouterLink to="/add">Add task</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </main>
</template>