export type Customization = {
    condition: (ctx: {propertName?: string, type: unknown}) => boolean,
    generator: (ctx: {propertName?: string, type: unknown}) => unknown,
}
