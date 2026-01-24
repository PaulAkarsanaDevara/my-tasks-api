export interface RegisteredModule {
  name: string;
  description?: string;
}

export const moduleRegistry: RegisteredModule[] = [];

export function registerModule(name: string, description?: string) {
  moduleRegistry.push({ name, description });
}
