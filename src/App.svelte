<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  /* Array donde guardaremos la data */
  let empanadas = [];

  /* Tipo comida favorita */
  let tipo_comida_favorita = d3
    .scaleOrdinal()
    .domain(["Salado", "Dulce", "Agridulce"])
    .range([
    "M7.82813 17.5C11.9703 17.5 15.3281 13.6385 15.3281 8.875C15.3281 4.11154 11.9703 0.25 7.82813 0.25C3.68599 0.25 0.328125 4.11154 0.328125 8.875C0.328125 13.6385 3.68599 17.5 7.82813 17.5Z", 
    "M27 21.5H3C5.37437 6.35093 9 1.99973 15.5 2C22 2.00027 25.5527 7.11409 27 21.5Z", 
    "repulge3"]);

  /* Comida favorita */
  let comida_favorita = d3
    .scaleOrdinal()
    .domain(["Asado", "Milanesa", "Empanadas", "Alfajor", "Helado", "Pizza"])
    .range(["#FF0000", "#14FF00", "#FFFF00", "#00FFFF", "#FF00FF", "#0000FF"]);

  /* 2. Escala para genero */
  let comidas_x_semana = d3
    .scaleQuantize()
    .domain([0, 4], [5, 9], [10, 14])
    .range([4, 6, 8]);

  /* 3. Escala para continentes */
  let rating = d3.scaleLinear().domain([1, 10]).range(["#000000", "#FBB040"]);

  /* 4. Escala para altura */
  let gasto_por_mes = d3
    .scaleOrdinal()
    .domain([10, 20], [30, 40], [50, 60])
    .range(["10-20","30-40","50-60"]);

  let gasto_height = d3
    .scaleOrdinal()
    .domain([10, 20], [30, 40], [50, 60])
    .range([109, 137, 168]);

  let gasto_fill = d3
    .scaleOrdinal()
    .domain([10, 20], [30, 40], [50, 60])
    .range([
      "M109.001 110.501C114.667 112.604 24.4996 114 4.87682 91.69C-14.746 69.3801 45.9992 -5.49992 109 1.00101C116.877 11.8744 118.754 29.9948 122.5 58.5011C119.795 89.5719 118.087 97.2526 109.001 110.501Z",
    "M140 110.5C145.666 112.604 17.484 121.266 2.64073 93.1968C-12.2025 65.1272 63.5 -26 142.5 8.00018C150.376 18.8736 150.253 34.494 154 63.0002C151.298 94.0277 149.092 97.2434 140.038 110.445L140 110.5Z",
    "M179 106C184.667 108.104 17.8431 122.57 2.9999 94.5001C-11.8434 66.4305 76.1528 -46.253 179 24C186.877 34.8734 188.254 39.4938 192 68.0001C189.295 99.071 188.087 92.7523 179 106Z",
    ]);

  let gusto_path = d3
  .scaleOrdinal()
    .domain([10, 20], [30, 40], [50, 60])
    .range([
      "M3.5 29L13 0L22.5 31.5L23.5 79.5L13 110L0 76.5L3.5 29Z", 
      "M0.5 51L13.5 0.5C20.734 18.2475 26.0512 27.1385 26 51C25.0262 72.02 22.8991 84.1355 13.5 104.5C7.37592 85.0501 4.46727 73.4605 0.5 51Z",
      "M1 42L13 2L24 42L13 80L1 42Z"
    ]);

    let gusto_size = d3
  .scaleOrdinal()
    .domain([10, 20], [30, 40], [50, 60])
    .range([
      "small", 
      "medium",
      "big"
    ]);

  onMount(() => {
    d3.csv("./data/empanadas.csv", d3.autoType).then((data) => {
      console.log(data); // Log the loaded data, not empanadas

      empanadas = data;
    });
  });

</script>

<main>
  <div class="header">
    <img src="./src/assets/empasaurios.png" width="500px" alt="bandera" />
    <h3 class="headline">
      <b>Gastronomía argentina</b>
    </h3>
    <h4 class="subheadline">
      Creando tu empanada ideal
    </h4>
  </div>

  <!-- Conedor de las entidades -->
  <div class="container">
    <!-- Iteramos la data para visualizar c/ entidad -->
    {#each empanadas as emp}
    <div class="card-wrapper" in:fly|global={{ y: 50, duration: index*300, delay: 100, easing: cubicOut }}>
      <div class = "empanada-wrapper">
        <svg
        class = "empanada-taste-{gusto_size(emp.porcentaje_de_gasto)}"
        >
          <path d={gusto_path(emp.porcentaje_de_gasto)} fill={comida_favorita(emp.comida_favorita_argentina)}>
        </svg>

        <svg
        class = "empanada-fill"
        fill="none">
          <path d={gasto_fill(emp.porcentaje_de_gasto)} fill={rating(emp.rating)}>
        </svg>

        <img src='./src/assets/{gasto_por_mes(emp.porcentaje_de_gasto)}.svg' class = "empanada-svg"/>
      </div>
      <p class = "name">
        {emp.nombre} <br>
      </p>
    </div>

    {/each}
  </div>
  <img src='./src/assets/viz-code.png' class = "viz-code" alt = "guia para la visualizacion"/>
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSe2NxH6-xyjCejQJKLfLZrZiWtOoUmYopUNxuC4NLlTnjbPnw/viewform?usp=sharing" class="button" target=”_blank” >Crea tu empanada</a>

</main>

<style>
  @import "./style/styles.css";
</style>
