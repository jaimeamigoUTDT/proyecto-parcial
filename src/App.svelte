<script>
  import * as d3 from "d3"
  import {onMount} from "svelte"

  /* Array donde guardaremos la data */
  let empanadas = []
 
  /* Tipo comida favorita */
  let tipo_comida_favorita = d3
    .scaleOrdinal()
    .domain(["Salado", "Dulce", "Agridulce"])
    .range(["repulge1", "repulge2", "repulge3"])

  /* Comida favorita */
  let comida_favorita = d3
    .scaleOrdinal()
    .domain(["Asado", "Milanesa", "Empanadas","Alfajor","Helado", "Pizza"])
    .range(["#FF0000", "#14FF00", "#FFFF00","#00FFFF","#FF00FF", "#0000FF"])

  /* 2. Escala para genero */
  let comidas_por_semana = d3
    .scaleQuantize()
    .domain([0,4,9,14])
    .range([4,6,8])

  /* 3. Escala para continentes */
  let rating = d3
    .scaleLinear()
    .domain([1,10])
    .range(["#000000", "#FBB040"])

  /* 4. Escala para altura */
  let gasto_por_mes = d3
    .scaleOrdinal()
    .domain([10,20],[30,40],[50,60])
    .range([600,820,1190])

  onMount(() => {
    d3.csv("./data/empanadas.csv", d3.autoType).then(data => {
      console.log(data); // Log the loaded data, not empanadas
      
      empanadas = data;
    })
  })
</script>


<main>
  <div class="header">
    <img src="/images/olympics-logo.png" width="100" alt="anillos" />
    <h3 class="headline">
      <b>Triunfos Olímpicos</b>
      Medallas, alturas y continentes
    </h3>
    <p class="bajada">Explorando los logros olímpicos a través de datos</p>
  </div>

  <!-- Conedor de las entidades -->
  <div class="container">
    <!-- Iteramos la data para visualizar c/ entidad -->
    {#each empanadas as emp}
      <div class="person-container">
        <div class="empanada-wrapper" style="background-color: {comida_favorita(emp.comida_favorita_argentina)}">
          <div class ="empanada-filler"><svg class = "empanada-svg" viewBox="0 0 {gasto_por_mes(emp.porcentaje_de_gasto)} 643" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M595.638 643C376.975 643 123.887 597.117 33.3619 555.695C2.12439 541.038 -8.0756 495.155 6.58691 428.242C44.1995 256.18 231.625 0 595 0C958.375 0 1146.44 256.18 1183.41 428.242C1198.08 494.517 1187.88 541.038 1156.64 555.695C1067.39 597.117 814.3 643 595.638 643ZM595.638 38.2359C254.575 38.2359 79.262 276.573 44.1994 436.526C32.0869 492.606 42.2869 517.459 49.2994 520.645C124.525 555.058 361.675 604.764 595.638 604.764C820.038 604.764 1064.84 555.695 1141.98 520.645C1148.99 517.459 1159.19 492.606 1147.08 436.526C1112.01 276.573 936.7 38.2359 595.638 38.2359Z" fill="#594A42"/>
            </svg>
        </div>
      </div>
        <p class="name">
          <b>{emp.nombre}</b>
          <br />
          <!--{dep.continente} -->
        </p>
      </div>
    {/each}
  </div>
</main>

<style>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 80px;
  }
  .headline {
    font-size: 30px;
    line-height: 1.2;
    font-weight: normal;
    text-align: center;
    margin: 20px;
  }
  .bajada {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin: 10px;
  }
  .headline b {
    display: block;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: end;
    margin: auto;
    flex-wrap: wrap;
    max-width: 1000px;
    gap: 30px;
    margin-bottom: 100px;
  }
  .person-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 180px 0 0;
  }
  .person {
    width: 100px;
    height: 100px;
    border: 10px solid black;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: pink;
  }
  .medal {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: gold;
    margin: 5px 0;
  }
  .name {
    font-size: 14px;
    color: rgb(65, 65, 65);
    font-weight: normal;
    text-align: center;
    margin-top: 5px;
  }
  .empanada-wrapper {
  width: 200px; 
  height: 160px;
  display: flex;
  align-items: flex-end; 
  }
  .empanada-svg {
    width: 200px;
    height: auto;
  }
</style>
