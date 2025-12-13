export function vueTemplate(componentName, hasVariant) {
    const variantsImport = hasVariant
        ? `import { ${componentName}Variants } from "./variants";\n`
        : "";
    const classBinding = hasVariant
        ? `:class="${componentName}Variants({})"`
        : `class=""`;

    return `<script setup lang="ts">
import type { ${componentName}Props } from "./types";
${variantsImport}
defineProps<${componentName}Props>();
</script>

<template>
  <div ${classBinding}>
    <!-- TODO: ${componentName} -->
  </div>
</template>
`;
}

export function typesTemplate(componentName) {
    return `export type ${componentName}Props = {
  // TODO: define props
};
`;
}

export function variantsTemplate(componentName) {
    return `import { tv } from "tailwind-variants";

export const ${componentName}Variants = tv({
  base: "",
  variants: {},
  defaultVariants: {},
});
`;
}

export function indexTemplate(fileBaseName, componentName) {
    return `export { default as ${componentName} } from "./${fileBaseName}.vue";
export * from "./types";
`;
}
