<script setup lang="ts">
import marks from '../../assets/toolkit.svg'

const groups = [
  { name: 'Frontend', tools: [['Vue','vuedotjs'], ['React','react'], ['JavaScript','javascript'], ['HTML','html5'], ['CSS','css']] },
  { name: 'Mobile', tools: [['Flutter','flutter']] },
  { name: 'Backend', tools: [['Laravel','laravel'], ['PHP','php'], ['Node.js','nodedotjs'], ['REST APIs','api']] },
  { name: 'Data', tools: [['MySQL','mysql'], ['PostgreSQL','postgresql'], ['MongoDB','mongodb'], ['Supabase']] },
  { name: 'Game development', tools: [['Godot'], ['RPG Maker']] },
  { name: 'AI automation', tools: [['n8n'], ['Zapier']] },
  { name: 'Hardware', tools: [['Arduino','arduino'], ['Raspberry Pi','raspberrypi'], ['Embedded systems','chip']] },
  { name: 'Design & production', tools: [['Figma','figma'], ['OBS Studio','obsstudio']] },
]
</script>

<template>
  <section id="stack" aria-labelledby="toolkit-heading">
    <h2 id="toolkit-heading">Toolkit</h2>
    <dl class="toolkit">
      <div v-for="group in groups" :key="group.name" class="tool-group">
        <dt>{{ group.name }}</dt>
        <dd><ul>
          <li v-for="[name, id] in group.tools" :key="name">
            <svg v-if="id" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use :href="marks+'#'+id" /></svg>
            {{ name }}
          </li>
        </ul></dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.tool-group { display:grid; grid-template-columns:100px 1fr; gap:10px; padding:14px 0; border-bottom:1px solid var(--rule); }
.tool-group:first-child { padding-top:0; }
.tool-group dt { font-size:13px; font-weight:600; color:var(--bright); padding:4px 0; }
.tool-group ul { list-style:none; display:flex; flex-wrap:wrap; gap:7px 15px; padding:0; margin:0; }
.tool-group li { display:inline-flex; align-items:center; gap:6px; padding:4px 0; font-size:13px; }
.tool-group svg { width:18px; height:18px; fill:currentColor; color:#b7d9dc; flex:none; }
@media (max-width:480px) { .tool-group { grid-template-columns:1fr; gap:2px; } }
</style>
