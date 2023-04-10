
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Timestamp, addDoc, collection, doc, orderBy, query, updateDoc } from '@firebase/firestore';
import { Todo } from 'components/models';
import { onMounted, ref } from 'vue';
import { useCollection, useFirestore } from 'vuefire';

const db = useFirestore();
const tasksCollection = collection(db, 'tasks');
const tasksQuery = query(tasksCollection, orderBy('done', 'asc'), orderBy('updatedAt', 'desc'));
const tasks = useCollection<Todo>(tasksQuery);


const prompt = ref(false);
const editting = ref<Todo | null>(null);
const enableAddButton = ref(false);
const newTaskContent = ref('');

function addTask() {
    enableAddButton.value = false;
    addDoc(tasksCollection, { 
        content: newTaskContent.value, 
        done: false, 
        updatedAt: Timestamp.now(), 
        createdAt: Timestamp.now() 
    }).then(() => {
        prompt.value = false;
        newTaskContent.value = '';
    }).finally(() => enableAddButton.value = true);
}

function updateTask(task: Todo) {
    updateDoc(doc(db, 'tasks', task.id), { content: task.content, updatedAt: Timestamp.now() })
        .finally(() => editting.value = null);
}

function toggleCheckbox(task: Todo, state: boolean) {
    updateDoc(doc(db, 'tasks', task.id), { done: state, updatedAt: Timestamp.now() });
}

onMounted(() => enableAddButton.value = true);
</script>

<template>
    <q-page container view="lhh LpR lff">
        <q-list separator>
            <transition-group name="list">
                <q-item 
                    clickable 
                    v-ripple 
                    v-for="task in tasks.filter(task => !task.done)"
                    :key="task.id"
                    @click="toggleCheckbox(task, !task.done)"
                >
                    <q-item-section side top>
                        <q-checkbox :model-value="task?.done" @update:model-value="toggleCheckbox(task, $event)" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label 
                            :class="{ 'text-strike': task.done }"
                            class="text-left"
                        >{{ task.content }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn flat dense round icon="edit" @click.stop="editting = task" />
                    </q-item-section>
                </q-item>


                <q-separator spaced />
                <q-item-label header class="q-px-lg text-gray-8">Completed</q-item-label>

                <q-item 
                    clickable 
                    v-ripple 
                    v-for="task in tasks.filter(task => task.done)"
                    :key="task.id"
                    @click="toggleCheckbox(task, !task.done)"
                >
                    <q-item-section side top>
                        <q-checkbox :model-value="task?.done" @update:model-value="toggleCheckbox(task, $event)" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label 
                            :class="{ 'text-strike': task.done }"
                            class="text-left"
                        >{{ task.content }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn flat dense round icon="edit" @click.stop="editting = task" />
                    </q-item-section>
                </q-item>
            </transition-group>
        </q-list>

        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">New task</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input dense v-model="newTaskContent" autofocus @keyup.enter="addTask" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Add" @click="addTask" />
            </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog :model-value="editting != null" persistent>
            <q-card style="min-width: 350px" v-if="editting">
                <q-card-section>
                    <div class="text-h6">Edit task</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="editting.content" autofocus @keyup.enter="updateTask(editting!!)" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" @click="updateTask(editting!!)" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>

    <teleport to=".q-toolbar" v-if="enableAddButton">
        <q-btn flat round dense icon="add" @click="prompt = true"/>
    </teleport>
</template>
<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}</style>