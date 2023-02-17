>>> *"Ethereum is a slow, expensive computer and that is an intentional design decision."* - Vitalik Buterin

## History of Fault Tolerant Computing
Fault-tolerant computing is a field of computer science that deals with the ability of computer systems to continue operating even in the presence of hardware or software failures. The history of fault-tolerant computing can be traced back to the 1970s, with the development of Lamport clocks, and has since evolved through several key technologies, including replication, consensus algorithms, and blockchain, culminating in the development of Nakamoto consensus.

In the 1970s, Leslie Lamport introduced the concept of logical clocks, or Lamport clocks, which were used to establish the order of events in distributed systems. Lamport clocks provided a way for nodes in a distributed system to synchronize their clocks without the need for a central clock, which was prone to failure. This allowed distributed systems to continue operating even in the event of clock failures.

Replication was another key technology in the development of fault-tolerant computing. In the 1980s, researchers began to explore the use of replication to provide fault tolerance in distributed systems. By replicating data or services across multiple nodes, a system could continue to function even if one or more nodes failed. Replication also enabled load balancing, as requests could be spread across multiple nodes, improving the overall performance of the system.

Consensus algorithms were another key development in the evolution of fault-tolerant computing. These algorithms were designed to allow distributed systems to make decisions even in the presence of failures. In the 1990s, the Paxos algorithm was developed, which enabled a distributed system to reach consensus on a value even if some of the nodes failed. This enabled fault tolerance in systems where decisions needed to be made, such as in distributed databases.

The concept of blockchain was introduced in 2008, with the publication of the Bitcoin whitepaper by Satoshi Nakamoto. Blockchain is a distributed ledger technology that provides a tamper-proof record of transactions. By using a consensus algorithm to validate transactions, blockchain provides a high degree of fault tolerance, as the records cannot be altered without the consensus of the network.

Nakamoto consensus, named after the creator of Bitcoin, is the consensus algorithm used in the Bitcoin network. This algorithm uses proof-of-work to validate transactions, and once a block is added to the blockchain, it cannot be altered without invalidating the entire chain. This provides a high degree of fault tolerance, as the records on the blockchain are tamper-proof.

<div align="center"><img src="./bft_timeline.svg"></img></div>

Blockchain development, including cryptocurrencies, are one of the most vibrant areas in computer science and research. The sector has attracted a great deal of investment as well as talented individuals. Going forward, there a number of open questions still deserving more research and development work. These include integrating new consensus approaches, quantum information theory, as well as machine learning applications on blockchains.

## Advantages of Smart Contracts and Blockchains

Decentralized computing offers a number of advantages over traditional centralized systems. Firstly, blockchain technology provides a high degree of transparency and immutability. Once data is recorded on the blockchain, it cannot be altered or deleted without the consensus of the network. This feature is particularly valuable for applications where data integrity is critical, such as financial transactions, supply chain management, or voting systems. With a traditional fault-tolerant system, data may be replicated across multiple nodes, but it is still possible for a node to be compromised, leading to the alteration or deletion of data. In contrast, blockchain technology provides an additional layer of security by making it difficult for an attacker to tamper with the data.

Secondly, blockchain technology offers a decentralized architecture that enables peer-to-peer communication without the need for a central authority. In a traditional fault-tolerant system, there may be a single point of failure, such as a central server, that can bring down the entire system. With a blockchain-based system, there is no central authority, and the nodes work together to maintain the system. This architecture is more resilient to attacks, as it is more difficult to bring down the entire system.

Thirdly, blockchain technology offers a high degree of fault tolerance without the need for complex consensus algorithms. In a traditional fault-tolerant system, achieving consensus can be challenging and often requires complex algorithms that are difficult to implement and maintain. In contrast, blockchain technology uses a simple but effective consensus algorithm, which ensures that all nodes in the network agree on the state of the system. This simplicity makes it easier to implement and maintain a fault-tolerant system based on blockchain technology.

Lastly, blockchain technology offers a high degree of interoperability, which means that different blockchain-based systems can communicate with each other seamlessly. This interoperability enables the creation of a decentralized ecosystem, where multiple blockchain-based systems can work together to provide more value to users. In contrast, traditional fault-tolerant systems are often proprietary, making it difficult to integrate them with other systems.

## Challenges & Opportunities

There are many remaining problems to be solved as well as theoretical limitations to blockchain technology. These include the trilemna limitation, scaling, as well as fee models.

### The Blockchain Trilemna Conjecture 

Vitalik Buterin, the co-founder of Ethereum, introduced the concept of the "blockchain trilemma," which refers to the trade-off between three key attributes of a blockchain system: security, scalability, and decentralization. The blockchain trilemma highlights the fact that it is difficult, if not impossible, to achieve all three attributes simultaneously in a blockchain system, and that any improvement in one attribute may come at the cost of another.

Security refers to the degree of protection against attacks or malicious behavior in a blockchain system. A secure blockchain must be able to prevent double-spending attacks, 51% attacks, and other types of attacks that can compromise the system. To achieve high security, a blockchain must have a high degree of computational power and consensus among nodes, which can make it more difficult to achieve scalability and decentralization.

Scalability refers to the ability of a blockchain system to handle a large number of transactions without compromising its performance. Scalability is essential for blockchain systems that need to process a high volume of transactions, such as payment systems or supply chain management systems. However, increasing scalability often requires sacrificing either security or decentralization. For example, some approaches to scalability involve reducing the number of nodes in the network, which can compromise decentralization, or reducing the level of computational power needed to validate transactions, which can compromise security.

Decentralization refers to the distribution of decision-making power among nodes in a blockchain system. A decentralized system has no single point of control, which makes it more resistant to attacks and censorship. However, achieving high decentralization often comes at the cost of scalability and security. For example, a highly decentralized system may have more nodes to achieve consensus, which can make it slower and more vulnerable to attacks.

The blockchain trilemma highlights the fact that it is challenging to achieve all three attributes simultaneously, and that any improvement in one attribute may come at the cost of another. For example, improving scalability by reducing the number of nodes can compromise decentralization, or increasing security by increasing computational power can compromise scalability. Thus, designers of blockchain systems must carefully consider the trade-offs between these attributes and choose the best balance for their specific use case.

### Scaling

### Fee Models and Layer 2s

## Future Directions

The crypto sector is so vibrant that it is difficult to list all of the opportunities. Here are a few:
* Machine Learning on Immutable data
* Quantum communciations and consensus
* Zero knowledge systems extensions
* Scaling systems using the above technologies
* Improved interoperability
* Hybridized traditional fault tolerance with byzantine approaches
