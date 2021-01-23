
function bfs(graph) {
  function traverse(root, currentDistance) {
    if (visitedNodes[root.value - 1] !== undefined){
      //console.log(`Node ${root.value} has already been visited.`)
      return
    } else {
      visitedNodes[root.value - 1] = currentDistance
    }

    let queue = root.connectedNodes

    for (let i = 0; i < queue.length; i++) {
      traverse(graph.nodes[queue[i] - 1], currentDistance + 6)
    }
  }

  const visitedNodes = []

  traverse(graph.rootNode, 0)

  const answer = []

  for(let i=0; i < graph.nodes.length; i++){
    if (i + 1 === graph.rootNode.value) continue

    if (visitedNodes[i] === undefined){
      answer.push(-1)
    } else {
      answer.push(visitedNodes[i])
    }
  }

  console.log(...answer)
}

class Graph {
  constructor(rtNode, nodes) {
    this.rootNode = rtNode
    this.nodes = nodes
  }
}

class Node {
  constructor(val, arr) {
    this.value = val
    this.connectedNodes = arr
  }
}

function createNodes(input) {
  const a = []
  const nodes = []
  const numNodes = input[0][0]
  const rootIndex = input[input.length - 1]


  for (let i = 1; i < input.length - 1; i++) {
    const edge = input[i]

    if (nodes[edge[0]] && edge[1]) {
      nodes[edge[0]].push(edge[1])
    } else {
      nodes[edge[0]] = [edge[1]]
    }

    if (!nodes[edge[1]]) {
      nodes[edge[1]] = [edge[0]]
    } else {
      nodes[edge[1]].push(edge[0])
    }

  }

  nodes.shift()

  for (let i = 0; i < numNodes; i++) {
    if (!nodes[i]) {
      nodes[i] = []
    }

    if (i !== rootIndex) {
      a.push(new Node(i + 1, nodes[i]))
    }
  }

  const rootNode = new Node(parseInt(nodes[rootIndex]), nodes[rootIndex - 1])
  const graph = new Graph(rootNode, a)
  return graph
}

let numberOfProblems = 0
function processData(input) {
  //Enter your code here
  let i = 0
  const lines = input.split(/\n/)
  numberOfProblems = parseInt(lines[i])
  i += 1

  const problems = []
  let problem = []

  while (i < lines.length) {
    const edge = lines[i].split(" ")
    problem.push(edge)
    if (lines[i].match(/^\d$/)) {
      problems.push(problem)
      problem = []
    }
    i++
  }

  problems.forEach(problem => {
    const graph = createNodes(problem)
    bfs(graph)
  })
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  processData(_input);
});
