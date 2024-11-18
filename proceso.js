
function dijkstra(graph, startNode, endNode) {
  let distances = {};
  let previousNodes = {};
  let unvisitedNodes = graph.nodes.get().map(node => node.id); // Obtener la lista de IDs de nodos

  // Inicialización de distancias y nodos no visitados
  unvisitedNodes.forEach((node) => {
    distances[node] = Infinity;
    previousNodes[node] = null;
  });
  distances[startNode] = 0;

  while (unvisitedNodes.length) {

    // Encontrar el nodo con la distancia más corta
    let currentNode = unvisitedNodes.reduce((minNode, node) => 
      distances[node] < distances[minNode] ? node : minNode
    );

    // Si hemos llegado al nodo de destino, termina la búsqueda
    if (currentNode === endNode) break;

    // Filtrar el nodo actual de los no visitados
    unvisitedNodes = unvisitedNodes.filter((node) => node !== currentNode);

    // Obtener vecinos y actualizar distancias
    graph.edges.get().forEach((edge) => {
      if (edge.from === currentNode || edge.to === currentNode) {
        const neighborNode = edge.from === currentNode ? edge.to : edge.from;
        const alt = distances[currentNode] + parseFloat(edge.label.replace(' km', ''));

        if (alt < distances[neighborNode]) {
          distances[neighborNode] = alt;
          previousNodes[neighborNode] = currentNode;
        }
      }
    });
  }

  // Reconstrucción del camino
  let path = [];
  let u = endNode;
  while (previousNodes[u]) {
    path.unshift(u);
    u = previousNodes[u];
  }
  if (u === startNode) path.unshift(u); // Agregar el nodo de inicio

  return {
    distance: distances[endNode],
    path: path,
  };
}

class Proceso {
  constructor(
    nombreProducto,
    hayMaterial,
    volumen,
    urgencia,
    tiempoDeEnvio,
    localizacionOrigen,
    localizacionFinal,
    graph, // Agregar el grafo como parámetro
    prioridad
  ) {
    this.nombreProducto = nombreProducto;
    this.hayMaterial = hayMaterial;
    this.volumen = volumen;
    this.urgencia = urgencia;
    this.localizacionOrigen = localizacionOrigen;
    this.localizacionFinal = localizacionFinal;

    // Calcular el tiempo de envío usando Dijkstra
    const resultado = dijkstra(graph, localizacionOrigen, localizacionFinal);
    this.tiempoDeEnvio = resultado.distance;
    this.prioridad = urgencia + tiempoDeEnvio;
  }
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; // Caso base: la lista ya está ordenada o vacía
  }

  const pivot = arr[arr.length - 1]; // Elegimos el último elemento como pivote
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    // Ordenar de mayor a menor basado en la prioridad
    if (arr[i].prioridad > pivot.prioridad) {
      left.push(arr[i]); // Elementos con prioridad mayor van al lado izquierdo
    } else {
      right.push(arr[i]); // Elementos con prioridad menor o igual van al lado derecho
    }
  }

  // Combina el resultado: elementos mayores (izquierda) + pivote + elementos menores (derecha)
  return [...quickSort(left), pivot, ...quickSort(right)];
}
