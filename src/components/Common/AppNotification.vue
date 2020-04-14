<template>
  <notifications position="bottom right">
    <template slot="body" slot-scope="props">
      <v-alert :type="props.item.type" border="left" dense dismissible>
        <div class="caption font-weight-bold text-capitalize">
          {{ props.item.title }}
        </div>
        <div class="caption">{{ props.item.text }}</div>
      </v-alert>
    </template>
  </notifications>
</template>
