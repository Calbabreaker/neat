function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

class Connection {
    constructor(inNode, outNode, weight, innovationID) {
        this.inNode = inNode;
        this.outNode = outNode;
        this.weight = weight;
        this.innovationID = innovationID;
        this.enabled = true;
    }
}

class Counter {
    counter = 0;

    count() {
        return ++counter;
    }
}

class Node {
    inputSum = 0;
    outputValue = 0;
    outputConnections = [];

    constructor(layer) {
        this.layer = layer;
    }

    // Activates node using sigmoid (except if input node) and adds its output to its
    // connected nodes, multiplied by the weight of the connection.
    passOnSum() {
        this.outputValue = this.layer === 0 ? this.inputSum : sigmoid(this.inputSum);
        this.inputSum = 0; // reset inputSum for next feed forward

        node.outputConnections.forEach((connection) => {
            connection.outNode.inputSum += nodeValue * connection.weight;
        });
    }

    connectedToNode(node) {
        return this.outputConnections.findIndex((connection) => connection.outNode === node) !== -1;
    }
}

class Network {
    nodes = [];
    connections = [];

    constructor(inputCount, outputCount) {
        this.connections = [];
        this.inputCount = inputCount;

        for (let i = 0; i < inputCount; i++) {
            this.nodes.push(new Node(0));
        }

        for (let i = 0; i < outputCount; i++) {
            this.nodes.push(new Node(1));
        }

        // bias node maybe
    }

    feedForward(inputValues) {
        if (inputValues.length != this.inputCount) {
            throw new Error(`Expected inputs to be of length ${this.inputCount}`);
        }

        inputValues.forEach((value, i) => {
            this.nodes[i].inputSum = value;
        });

        this.nodes.forEach((node) => {
            node.passOnSum();
        });

        const outputNodes = this.nodes.slice(-this.outputCount);
        return outputNodes.map((node) => node.outputValue);
    }

    // Adds a connection bewtween two random unconnected nodes
    mutateAddConnection(innovationCount) {
        // only allow 500 tries
        for (let i = 0; i < 500; i++) {
            let node1 = getRandom(this.nodes);
            let node2 = getRandom(this.nodes);

            // swap if node 1 is at higher layer
            if (node1.layer > node2.layer) {
                [node1, node2] = [node2, node1];
            }

            if (node1.layer === node2.layer && node1.connectedToNode(node2)) {
                // incompatible node try again
                continue;
            }

            const weight = Math.random() * 2 - 1; // -1 to 1
            const connection = new Connection(node1, node2, weight, innovationCount.count());
            this.connections.push(connection);
            node.outputConnections.push(connection);
            break;
        }
    }

    // Adds a node in the middle of a prexisting connection creating two new connections
    mutateAddNode(innovationCount) {
        const connection = getRandom(this.connections);
    }
}
