<template>
  <div class="page-content nacelle">
    <div v-if="page">
      <div v-for="section in page.sections" :key="section._id">
        <component
          :is="getComponentDefinition(section._type)"
          v-if="section._type"
          :id="section._id"
          v-bind="section"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { pascalCase } from 'pascal-case'
import HeroBanner from '~/components/nacelle/ContentHeroBanner'
import SideBySide from '~/components/nacelle/ContentSideBySide'
import ProductGrid from '~/components/nacelle/ContentProductGrid'
import CollectionGrid from '~/components/nacelle/CollectionGrid'
import NacelleComponentPlaceholder from '~/components/nacelle/NacelleComponentPlaceholder'

export default {
  components: {
    HeroBanner,
    SideBySide,
    ProductGrid,
    CollectionGrid,
    NacelleComponentPlaceholder
  },
  props: {
    page: {
      type: Object,
      default: () => ({
        source: '',
        sections: []
      })
    }
  },
  methods: {
    getComponentDefinition(def) {
      if (this.$options.components[pascalCase(def)]) {
        return def
      } else {
        return 'NacelleComponentPlaceholder'
      }
    }
  }
}
</script>

<style></style>
