const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/about.tsx',
  'src/pages/contact.tsx',
  'src/pages/solutions.tsx',
  'src/pages/services.tsx',
  'src/components/layout/Navbar.tsx',
  'src/pages/home.tsx',
  'src/components/shared/AnimateOnScroll.tsx',
  'src/components/shared/GradientButton.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, 'artifacts/agency-site', file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove imports
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*["']framer-motion["'];?\n?/g, '');
  
  // Also remove motion if it's imported with other things
  // E.g. import { motion, AnimatePresence } from "framer-motion";
  // The regex above handles the whole import line.

  // Replace <motion.tag> with <tag>
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

  // Remove framer-motion props
  // Match prop={...} or prop="{{...}}" or prop="something"
  // It matches initial={{...}}, animate={{...}}, etc.
  const propsToRemove = ['initial', 'animate', 'transition', 'whileHover', 'whileTap', 'whileInView', 'viewport', 'variants', 'exit', 'layoutId'];
  
  for (const prop of propsToRemove) {
    // Regex for prop={{...}} or prop={...} or prop="..."
    // We use a regex that can handle 1 level of nested braces {{ ... }}
    const regex = new RegExp(`\\s+${prop}=(?:\\{\\{.*?\\}\\}|\\{[^}]*\\}|"[^"]*"|'[^']*')`, 'gs');
    content = content.replace(regex, '');
  }

  // Remove `layout` boolean prop
  content = content.replace(/\s+layout(?=\s|>|\/)/g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Done replacing.");
