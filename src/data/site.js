export const links = {
  blog: {
    label: 'Blog',
    href: 'https://blog.csdn.net/lhf__',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/lhf-hub?tab=repositories',
  },
  email: {
    label: 'Email',
    href: 'mailto:leemail208@163.com',
    text: 'leemail208@163.com',
  },
  salaryticker: {
    label: 'SalaryTicker',
    href: 'https://salaryticker.leelab.com.cn/',
  },
  jobpilot: {
    label: 'JobPilot',
    href: 'http://47.106.222.233:8000/',
  },
}

/*
 * The 3D portrait. Drop a `.glb` at public/assets/portrait.glb and it replaces
 * the procedural stand-in with no other change. Keep it small: this loads after
 * the first paint, on top of the hero type.
 */
export const portrait = {
  src: '/assets/portrait.glb',
  // Fraction of the viewport height the model should span.
  height: 0.78,
  // Horizontal offset in camera units; positive pushes it right of centre.
  x: 1.15,
}

export const typewriter = [
  'I design it, build it, test it and ship it.',
  'SalaryTicker — your salary, every second.',
  'JobPilot — your next job, prepared.',
  'No dashboards. No sign-ups. No noise.',
]

/* Demo numbers for the SalaryTicker readout. Never presented as real pay. */
export const demo = {
  monthly: 8721.09,
  perSecond: 0.0304,
  today: 838.86,
}
