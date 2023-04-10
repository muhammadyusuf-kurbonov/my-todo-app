<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=ToDo&uppercase=false&length=4&font-size=0.33">
            </q-avatar>
            My ToDo List
          </q-toolbar-title>

          <div id="toolbar-right" class="toolbar-actions"></div>
        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <!-- drawer content -->
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>
  
<script>
import { ref } from 'vue';
  
export default {
    setup () {
        const rightDrawerOpen = ref(false);
  
        return {
            rightDrawerOpen,
            toggleRightDrawer () {
                rightDrawerOpen.value = !rightDrawerOpen.value;
            }
        };
    }
};
</script>