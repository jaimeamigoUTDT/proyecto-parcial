<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import * as functions from "./functions/functions.js";

  /* Array donde guardaremos la data */
  let empanadas = [];

  function loadGoogleSheet(id, gid) {
    d3.csv(
      `https://docs.google.com/spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`,
    )
      .then((data) => {
        console.log(data);
        empanadas = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadGoogleSheet("1ZKjSD97M17JPG-wn9zvJ_DuIQms0tZFaoRrYA8CXWGM", "432932618");

  /* Tipo comida favorita */
  let tipo_comida_favorita = d3
    .scaleOrdinal()
    .domain(["Salado", "Dulce", "Agridulce"])
    .range(["salada", "dulce", "dulce"]);

  /* Comida favorita */
  let comida_favorita = d3
    .scaleOrdinal()
    .domain(["Asado", "Milanesa", "Empanadas", "Alfajor", "Helado", "Pizza"])
    .range(["#FF0000", "#14FF00", "#FFFF00", "#00FFFF", "#FF00FF", "#0000FF"]);

  /* 2. Escala para genero */
  let comidas_x_semana = d3
    .scaleQuantile()
    .domain([0,14]) // Define el rango de valores de comidas por semana (por ejemplo, de 0 a 14)
    .range([4,6,8]); // Define los rangos de salida

  /* 3. Escala para continentes */
  let rating = d3.scaleLinear().domain([1, 10]).range(["#000000", "#FBB040"]);

  /* 4. Escala para altura */
  let gasto_por_mes = d3
    .scaleOrdinal()
    .domain(["10%", "20%", "30%", "40%", "50%", "60%"]) // Define los valores de gasto por mes
    .range(["10-20", "10-20", "30-40", "30-40", "50-60", "50-60"]); // Define los rangos de salida

  let gasto_fill = d3
    .scaleOrdinal()
    .domain(["10%", "20%", "30%", "40%", "50%", "60%"])
    .range([
      "M109.001 110.501C114.667 112.604 24.4996 114 4.87682 91.69C-14.746 69.3801 45.9992 -5.49992 109 1.00101C116.877 11.8744 118.754 29.9948 122.5 58.5011C119.795 89.5719 118.087 97.2526 109.001 110.501Z",
      "M109.001 110.501C114.667 112.604 24.4996 114 4.87682 91.69C-14.746 69.3801 45.9992 -5.49992 109 1.00101C116.877 11.8744 118.754 29.9948 122.5 58.5011C119.795 89.5719 118.087 97.2526 109.001 110.501Z",
      "M140 110.5C145.666 112.604 17.484 121.266 2.64073 93.1968C-12.2025 65.1272 63.5 -26 142.5 8.00018C150.376 18.8736 150.253 34.494 154 63.0002C151.298 94.0277 149.092 97.2434 140.038 110.445L140 110.5Z",
      "M140 110.5C145.666 112.604 17.484 121.266 2.64073 93.1968C-12.2025 65.1272 63.5 -26 142.5 8.00018C150.376 18.8736 150.253 34.494 154 63.0002C151.298 94.0277 149.092 97.2434 140.038 110.445L140 110.5Z",
      "M179 106C184.667 108.104 17.8431 122.57 2.9999 94.5001C-11.8434 66.4305 76.1528 -46.253 179 24C186.877 34.8734 188.254 39.4938 192 68.0001C189.295 99.071 188.087 92.7523 179 106Z",
      "M179 106C184.667 108.104 17.8431 122.57 2.9999 94.5001C-11.8434 66.4305 76.1528 -46.253 179 24C186.877 34.8734 188.254 39.4938 192 68.0001C189.295 99.071 188.087 92.7523 179 106Z",
    ]);

  let gusto_path = d3
    .scaleOrdinal()
    .domain(["10%", "20%", "30%", "40%", "50%", "60%"])
    .range([
      "M3.5 29L13 0L22.5 31.5L23.5 79.5L13 110L0 76.5L3.5 29Z",
      "M3.5 29L13 0L22.5 31.5L23.5 79.5L13 110L0 76.5L3.5 29Z",
      "M0.5 51L13.5 0.5C20.734 18.2475 26.0512 27.1385 26 51C25.0262 72.02 22.8991 84.1355 13.5 104.5C7.37592 85.0501 4.46727 73.4605 0.5 51Z",
      "M0.5 51L13.5 0.5C20.734 18.2475 26.0512 27.1385 26 51C25.0262 72.02 22.8991 84.1355 13.5 104.5C7.37592 85.0501 4.46727 73.4605 0.5 51Z",
      "M1 42L13 2L24 42L13 80L1 42Z",
      "M1 42L13 2L24 42L13 80L1 42Z",
    ]);

  let gusto_size = d3
    .scaleOrdinal()
    .domain(["10%", "20%", "30%", "40%", "50%", "60%"])
    .range(["small", "small", "medium", "medium", "big", "big"]);

  
</script>

<main>
  <div class="header">
    <img src="./src/assets/Flag_of_Argentina.svg" width="200px" alt="bandera" />
    <h3 class="headline">
      <b>Gastronomía argentina</b>
    </h3>
    <h4 class="subheadline">Creando tu empanada ideal</h4>
  </div>

  <!-- Conedor de las entidades -->
  <div class="container">
    <!-- Iteramos la data para visualizar c/ entidad -->
    {#each empanadas as emp}
      <div class="card-wrapper">
        <div class="empanada-wrapper">
          <svg class="empanada-taste-{gusto_size(emp.porcentaje_de_gasto)}">
            <path
              d={gusto_path(emp.porcentaje_de_gasto)}
              fill={comida_favorita(emp.comida_favorita_argentina)}
            >
            </path></svg
          >

          <svg class="empanada-fill" fill="none">
            <path
              d={gasto_fill(emp.porcentaje_de_gasto)}
              fill={rating(emp.rating)}
            >
            </path></svg
          >

          <img
            src="./src/assets/{gasto_por_mes(emp.porcentaje_de_gasto)}.svg"
            class="empanada-svg"
            alt="Empanada"
          />

          <!-- TODO modificar clases para que se adapte el repulge -->
          <img
            src="./src/assets/{gasto_por_mes(
              emp.porcentaje_de_gasto,
            )} {tipo_comida_favorita(
              emp.tipo_de_comida_favorita,
            )} - {comidas_x_semana(emp.comidas_por_semana)}.svg"
            class="repulgue"
            alt="repulgue"
          />
        </div>
        <p class="name">
          {emp.nombre} <br />
        </p>
      </div>
    {/each}
  </div>
  <img
    src="./src/assets/viz-code.png"
    class="viz-code"
    alt="guia para la visualizacion"
  />
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSe2NxH6-xyjCejQJKLfLZrZiWtOoUmYopUNxuC4NLlTnjbPnw/viewform?usp=sharing"
    class="button"
    target="”_blank”">Crea tu empanada</a
  >
</main>

<style>
  @import "./style/styles.css";
</style>
