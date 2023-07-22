<template>
  <q-page class="row items-center justify-evenly">
    
    <q-card style="width:800px">
      <q-card-section>
        <div>明るさ</div>
        <q-slider
        v-model="brightness"
        @change="sendSave"
        :min="0"
        :max="1"
        :step=0.01
        label
        label-always
      ></q-slider>
      </q-card-section>
      <q-card-actions>
        <q-btn flat align="right" @click="saveDefault()">初期設定に戻す</q-btn>
        <q-space></q-space>
        <!--
        <q-btn flat align="left" @click="sendSave()">保存</q-btn>
        -->
      </q-card-actions>
    </q-card>
    
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  components: { },
  setup () {
    const $q = useQuasar();
    const sendSave = async()=>{
      //$q.bex.send('log', { message: 'Hello World!' });
      const bright = await $q.bex.send('storage.set', { key: 'bright', value: brightness.value });
      console.log('bright:',bright)
    }
    let brightness = ref(0.7);

    $q.bex.send('storage.get', {key: 'bright'}).then((res)=>{
      brightness.value = res.data
      console.log('get bright:', res.data);
    })

    const saveDefault = async ()=>{
      brightness.value = 0.7;
      sendSave();
    }

    return { sendSave, brightness, saveDefault };
  }
});
</script>
