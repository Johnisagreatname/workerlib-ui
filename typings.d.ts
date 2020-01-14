declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module "*.vux" {
    import Vux from 'vux'
    export default Vux
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
        $echarts: any,
        $vux: any,
    }
}
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
declare module "*.json"
declare module "*.png"