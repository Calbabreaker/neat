function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandom(array) {
    return array[randInt(array.length)];
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
        return counter++;
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
            if (connection.enabled) {
                connection.outNode.inputSum += nodeValue * connection.weight;
            }
        });
    }

    connectedToNode(node) {
        return this.outputConnections.findIndex((connection) => connection.outNode === node) !== -1;
    }
}

class Network {
    // 2d array of layers of nodes
    nodeLayers = [];
    connections = [];

    constructor(inputCount, outputCount) {
        this.connections = [];

        this.nodeLayers.push(new Array(inputCount).fill().map(() => new Node(0)));
        this.nodeLayers.push(new Array(outputCount).fill().map(() => new Node(1)));
        // bias node maybe
    }

    feedForward(inputValues) {
        if (inputValues.length != this.nodeLayers[0].length) {
            throw new Error(`Expected inputs to be of length ${this.nodeLayers[0].length}`);
        }

        inputValues.forEach((value, i) => {
            this.nodeLayers[0][i].inputSum = value;
        });

        this.nodeLayers.forEach((layer) => {
            layer.forEach((node) => {
                node.passOnSum();
            });
        });

        return this.nodeLayers.at(-1).map((node) => node.outputValue);
    }

    // // Crossovers this network with another parent creating a new child assumming `this` is the more fit parent
    // crossover(otherParent) {
    //     const child = new Network(this.inputCount, this.outputCount);
    // }

    mutate() {
        this.mutateAddConnection();
    }

    // Adds a connection bewtween two random unconnected nodes
    mutateAddConnection(innovationCounter) {
        // only allow 100 tries
        for (let i = 0; i < 100; i++) {
            const layerIndex1 = randInt(this.nodeLayers.length);
            const layerIndex2 = randInt(this.nodeLayers.length);
            // can't be same layer
            if (layerIndex1 === layerIndex2) {
                continue;
            }

            let node1 = getRandom(this.nodeLayers[layerIndex1]);
            let node2 = getRandom(this.nodeLayers[layerIndex2]);

            // swap if node 1 is at higher layer
            if (layerIndex1 > layerIndex2) {
                [node1, node2] = [node2, node1];
            }

            if (node1.connectedToNode(node2)) {
                continue;
            }

            const weight = Math.random() * 2 - 1; // -1 to 1
            const connection = new Connection(node1, node2, weight, innovationCounter.count());
            this.connections.push(connection);
            node1.outputConnections.push(connection);
            break;
        }
    }

    // Adds a node in the middle of a prexisting connection creating two new connections
    mutateAddNode(innovationCounter) {
        const oldConnection = getRandom(this.connections);
        oldConnection.enabled = false;

        const newNode = new Node();
        this.connections.push(
            new Connection(oldConnection.inNode, newNode, 1, innovationCounter.count())
        );
        this.connections.push(
            // prettier-ignore
            new Connection(newNode, oldConnection.outNode, oldConnection.weight, innovationCounter.count())
        );

        // create a new layer if new node's layer is the same is the output node's layer
        if (newNode.layer === oldConnection.outNode.layer) {
            this;
        }
    }
}
