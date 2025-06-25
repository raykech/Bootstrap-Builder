<template>
  <div v-if="component">
    <DropdownOptions v-if="component === 'Dropdown'" :options="options" @update:options="emit('update:options', $event)" />
    <CardOptions v-else-if="component === 'Card'" :options="options" @update:options="emit('update:options', $event)" />
    <AlertOptions v-else-if="component === 'Alert'" :options="options" @update:options="emit('update:options', $event)" />
    <BadgeOptions v-else-if="component === 'Badge'" :options="options" @update:options="emit('update:options', $event)" />
    <ListGroupOptions v-else-if="component === 'ListGroup'" :options="options" @update:options="emit('update:options', $event)" />
    <NavbarOptions v-else-if="component === 'Navbar'" :options="options" @update:options="emit('update:options', $event)" />
    <GridOptions v-else-if="component === 'Grid'" :options="options" @update:options="emit('update:options', $event)" />
    <FlexOptions v-else-if="component === 'Flex'" :options="options" @update:options="emit('update:options', $event)" />
    <ModalOptions v-else-if="component === 'Modal'" :options="options" @update:options="emit('update:options', $event)" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { DropdownOptions, CardOptions, AlertOptions, BadgeOptions, ListGroupOptions, NavbarOptions, GridOptions, FlexOptions, ModalOptions } from './options'
const props = defineProps({ component: String, options: Object })
const emit = defineEmits(['update:options'])
</script>
