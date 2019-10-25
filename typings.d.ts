declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module "*.iview" {
  import iview from 'Vue'
  export default iview
}

declare module 'tinymce' {
  import tinymce from 'tinymce/tinymce'
  export default tinymce;
}

declare module 'vue/types/vue' {
    interface Vue {
        $echarts: any
    }
}