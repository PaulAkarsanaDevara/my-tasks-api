import { moduleRegistry } from '../../containers/module-registry';
import '../../containers/container';

const line = '═'.repeat(38);
const now = new Date().toLocaleString('sv-SE', { hour12: false }).replace('T', ' ');

console.log(`
${line}
   MY-TASKS API · MODULE REGISTRY
${line}

📦 Loaded Inversify Modules (${moduleRegistry.length})
`);

moduleRegistry.forEach((m, i) => {
  const desc = m.description ? ` → ${m.description}` : '';
  console.log(`  ${i + 1}) ${m.name.padEnd(15)}${desc}`);
});

console.log(`
${'─'.repeat(38)}
✔ Container status : READY
✔ Timestamp        : ${now}
${line}
`);
