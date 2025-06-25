<template>
  <nav :class="['navbar', options.scheme, options.bg, options.fixedTop ? 'fixed-top' : '']">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ options.brand }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <form v-if="options.search" class="d-flex ms-auto"><input class="form-control" type="search" placeholder="Ara"></form>
      </div>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({ options: Object })
</script>
