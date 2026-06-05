function fillTokenRows() {
  const leftColors = ["#7B61FF", "#7370E8", "#6B7FD2", "#638FBC", "#5B9EA6", "#53AD90", "#4BBC79", "#2A9D8F"];
  const rightColors = ["#2A9D8F", "#3E9B9F", "#529AAF", "#6698BF", "#7A96CF", "#7E83E5", "#7B61FF", "#7B61FF"];
  document.querySelectorAll(".tokens").forEach((row) => {
    if (row.children.length) return;
    for (let i = 0; i < 8; i += 1) {
      const token = document.createElement("i");
      token.style.background = row.classList.contains("tok-left") || row.classList.contains("tok-left-ghost")
        ? leftColors[i]
        : rightColors[i];
      row.appendChild(token);
    }
  });
}

function fillMiniDiagram() {
  const dots = document.querySelector(".diag-mini .dots");
  if (!dots || dots.children.length) return;
  const pts = [
    [42, 112], [52, 101], [66, 88], [78, 73], [90, 62],
    [105, 52], [119, 43], [134, 34], [48, 84], [72, 52],
    [98, 39], [125, 25],
  ];
  pts.forEach(([cx, cy]) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", cx);
    c.setAttribute("cy", cy);
    c.setAttribute("r", "5");
    dots.appendChild(c);
  });
}

function updateAnimationSteps() {
  document.querySelectorAll("[data-anim]").forEach((section) => {
    const name = section.dataset.anim;
    const steps = section.querySelectorAll(".fragment.visible").length;
    section.classList.remove(
      "ph", "encoder", "cka", "quant-methods", "motivation", "quant-results", "usecases",
      "step-0", "step-1", "step-2", "step-3", "step-4", "step-5", "step-6", "step-7"
    );
    section.classList.add(name);
    for (let i = 0; i <= steps; i += 1) {
      section.classList.add(`step-${i}`);
    }
    if (name === "ph") updatePersistentHomologyGeometry(section, steps);
  });
}

function updatePersistentHomologyGeometry(section, steps) {
  const clamped = Math.min(steps, 6);
  const radii = [0, 69, 84, 96, 104, 120, 136];
  section.querySelectorAll(".ball").forEach((ball) => ball.setAttribute("r", radii[clamped]));

  const barDefaults = { b0: 650, b1: 650, b2: 650, b3: 650, b4: 650, b5: 948 };
  const barSteps = [
    barDefaults,
    { b0: 848, b1: 848, b2: 848, b3: 848, b4: 848, b5: 948 },
    { b0: 891, b1: 848, b2: 848, b3: 891, b4: 891, b5: 948 },
    { b0: 925, b1: 848, b2: 848, b3: 891, b4: 925, b5: 948 },
    { b0: 948, b1: 848, b2: 848, b3: 891, b4: 925, b5: 948 },
    { b0: 994, b1: 848, b2: 848, b3: 891, b4: 925, b5: 994 },
    { b0: 1041, b1: 848, b2: 848, b3: 891, b4: 925, b5: 1041 },
  ];
  const bars = barSteps[clamped];
  Object.entries(bars).forEach(([klass, x2]) => {
    const line = section.querySelector(`.${klass}`);
    if (line) line.setAttribute("x2", x2);
  });

  const sweep = section.querySelector(".sweep");
  if (sweep) {
    const offsets = [0, 198, 241, 275, 298, 344, 391];
    sweep.setAttribute("transform", `translate(${offsets[clamped]} 0)`);
  }
}

Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  slideNumber: "c/t",
  showSlideNumber: "all",
  center: false,
  width: 1200,
  height: 750,
  margin: 0.005,
  minScale: 0.2,
  maxScale: 3.0,
  transition: "fade",
  backgroundTransition: "fade",
});

fillTokenRows();
fillMiniDiagram();
Reveal.on("ready", updateAnimationSteps);
Reveal.on("slidechanged", updateAnimationSteps);
Reveal.on("fragmentshown", updateAnimationSteps);
Reveal.on("fragmenthidden", updateAnimationSteps);
