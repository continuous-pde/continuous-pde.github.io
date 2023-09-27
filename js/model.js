// const svgContainer = d3.select("#svg-container");
var svg2 = d3.select("#svg-container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", [0, 0, 1000, 1000]);

text= svg2.append("foreignObject").attr("x", 0)
    .attr("y", 800)
    .attr("width", 1000)
    .attr("height", 200)
    .append("xhtml:body")
    .style("color", "black")
    .style("font-size", "20px")
    .style("text-align", "center")
    .text("");

const SCROLL_LENGTH = 400;

const hrElement = document.getElementById("hr");
const OFFSET = hrElement.offsetTop;
// console.log(OFFSET)

d3.select("#svg-container").style("position", "absolute")
d3.select("#text_container").style("position", "absolute")
d3.select("#svg-container").style("pointer-events", "none")
d3.select("#svg-container").style("opacity", 0)

d3.xml("assets/model_V2.svg")
    .then(data => {
        svg2.node().append(data.documentElement);

        const initialcondition = svg2.selectAll("#IC_input");
        const xarrows = svg2.selectAll("#IC_arrows");
        const encoder = svg2.selectAll("#ENCODER");
        const backbone = svg2.selectAll("#BACKBONE");
        const gnn1 = svg2.selectAll("#GNN1");
        const gnn2 = svg2.selectAll("#GNN2");
        const gnn3 = svg2.selectAll("#GNN3");
        const shared = svg2.selectAll("#SHARED");
        const embeddings = svg2.selectAll("#EMBEDDINGS");
        const input = svg2.selectAll("#INPUT");
        const input_text = svg2.selectAll("#INPUT_TEXT");
        const attention = svg2.selectAll("#ATTENTION_MAIN");
        const posenc = svg2.selectAll("#POSENC");
        const output = svg2.selectAll("#OUTPUT");
        const supervision = svg2.selectAll("#SUPERVISION");
        const gru = svg2.selectAll("#GRU");
        const P = svg2.selectAll("#P");
        const D = svg2.selectAll("#D");
        const output_attention = svg2.selectAll("#OUTPUT_ATTENTION");
        const trajectory = svg2.selectAll("#trajectory");
        const in_t = svg2.selectAll("#in-T");


        // Set opacity of everything to 0
        initialcondition.style("opacity", 0);
        xarrows.style("opacity", 0);
        encoder.style("opacity", 0);
        backbone.style("opacity", 0);
        gnn1.style("opacity", 0);
        gnn2.style("opacity", 0);
        gnn3.style("opacity", 0);
        shared.style("opacity", 0);
        embeddings.style("opacity", 0);
        input.style("opacity", 0);
        input_text.style("opacity", 0);
        attention.style("opacity", 0);
        posenc.style("opacity", 0);
        output.style("opacity", 0);
        supervision.style("opacity", 0);
        gru.style("opacity", 0);
        P.style("opacity", 0);
        D.style("opacity", 0);
        output_attention.style("opacity", 0);
        trajectory.style("opacity", 0);
        in_t.style("opacity", 0);

        // list of the objects in order of appearance, with parameter to control the direction of the animation and the delay
        object_list = [
            {object: initialcondition, direction: 1, delay: 1},
            {object: xarrows, direction: 1, delay: 1},
            {object: encoder, direction: 1, delay: 1 / 2},
            {object: backbone, direction: 1, delay: 1 / 2},
            {object: gnn1, direction: 1, delay: 1 / 4},
            {object: gnn2, direction: 1, delay: 1 / 4},
            {object: gnn3, direction: 1, delay: 1 / 4},
            {object: shared, direction: -1, delay: 1 / 4},
            {object: embeddings, direction: -1, delay: 1},
            {object: attention, direction: -1, delay: 1},
            {object: input, direction: -1, delay: 1 / 2},
            {object: input_text, direction: -1, delay: 1 / 2},
            {object: posenc, direction: -1, delay: 1},
            {object: output_attention, direction: -1, delay: 1 / 2},
            {object: gru, direction: -1, delay: 1 / 2},
            {object: D, direction: -1, delay: 1 / 2},
            {object: output, direction: 1, delay: 1 / 2},
            {object: P, direction: 1, delay: 1 / 2},
            {object: supervision, direction: 1, delay: 1 / 2},
            {object: trajectory, direction: 1, delay: 1 / 2},
            {object: in_t, direction: 1, delay: 1 / 2},
        ]


        function handleScroll() {
            const OFFSET = hrElement.offsetTop;
            const currentScrollPos = window.pageYOffset - OFFSET;

            if (currentScrollPos < 0) {
                d3.select("#svg-container").style("position", "absolute")
                d3.select("#text_container").style("position", "absolute")
                d3.select("#svg-container").style("pointer-events", "none")
            } else {
                d3.select("#svg-container").style("position", "fixed")
                d3.select("#text_container").style("position", "fixed")
            }

            const translateY_scale = d3.scaleLinear().domain([1, 0]).range([0, 100]).clamp(true)
            const translateY_scale_inv = d3.scaleLinear().domain([0, 1]).range([-100, 0]).clamp(true)

            current_time = 0;
            BETA = 1/3;
            // Loop over the objects and set the opacity and translation
            object_list.forEach((object) => {
                o = object.object;
                d = object.direction;
                delay = object.delay;

                opacity = Math.min((currentScrollPos - current_time) / ((SCROLL_LENGTH * delay) * BETA), 1);
                opacity = Math.max(opacity, 0);
                o.style("opacity", opacity);
                if (d === 1) {
                    o.attr("transform", `translate(0, ${translateY_scale(opacity)})`);
                } else {
                    o.attr("transform", `translate(0, ${translateY_scale_inv(opacity)})`);
                }
                current_time += delay * SCROLL_LENGTH;
            });

        }


        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);
    });

const paragraphs = [
    "Our model takes as input the initial condition of the trajectory to be simulated. It consists in a point cloud of measurements scattered over the space domain X",
    "The measurement points belongs to the In-X set. The rest of the space domain Ext-X remains un-observed during both training and inference.",
    "This initial condition is encoded into a latent space and transformed into a graph using Delaunay triangulation.",
    "This graph is fed into an auto-regressive backbone consisting of chained multi-layer graph neural networks (GNNs) with shared weights.",
    "We obtain a set of very rich latent embeddings modeling the evolution of the trajectory over time. Note that each application of the GNNs advances the trajectory by some constant time, which is a hyper-parameter of the model.",
    "These embeddings provide context for an interpolation module. More precisely, each embedding is used as key and value to a multi-head attention. By applying the attention to each embedding individually, we enforce the interpolation module to consider at least one point per time-step.",
    "Our model takes a second input which correspond to the query location in space and time. This query can be taken arbitrarily in the space-time domain, including in the un-observed region Ext-X or Ext-T.",
    "The query is projected to a higher dimensional space using fourier features, and used as query input to the attention modules. The interpolation is performed by computing attention between the queried location, and the latent embeddings of the trajectory at observed positions.",
    "We used a GRU to aggregate the outputs of the attention modules through time. The attention outputs contains rich information, and the GRU is used to filter, forget and retain the relevant information.",
    "Finally, the output of the GRU is fed into a fully connected layer to predict the value of the trajectory at the queried location.",
    "We found beneficial to ground the embeddings from the auto-regressive backbone to physics using a supervised auxiliary objective. We used a second MLP to project each embeddings back to the physics space. Note that this is different from classic auto-regressive GNN baselines in physics: the prediction is still performed in the latent space, but the embeddings are forced to contain at least information about the physical states at each time-step.",
    "The intermediate embeddings are supervised using frames inside the training domain In-T. The rest of the temporal domain Ext-T remains un-observed during both training and inference."
];

// const text = d3.select("#text");


function scrollHandler() {
    const currentScrollPos = window.pageYOffset - OFFSET;

    GAMMA = 1 / 3;
    paragraphs_index = Math.floor(currentScrollPos / SCROLL_LENGTH - 1);  // -2/3 makes it more natural
    if (currentScrollPos < 0) {
        text.style("opacity", 0)
    } else if (paragraphs_index >= paragraphs.length) {
        text.text(paragraphs[paragraphs.length - 1])
        text.style("opacity", 1)
    } else {
        text.text(paragraphs[paragraphs_index]);

        t0 = paragraphs_index * SCROLL_LENGTH;
        t1 = (paragraphs_index + 1) * SCROLL_LENGTH;
        if ((currentScrollPos - t0) < SCROLL_LENGTH * GAMMA) {
            text.style("opacity", (currentScrollPos - t0) / (SCROLL_LENGTH * GAMMA));
        } else {
            text.style("opacity", 1);
        }
    }
}

window.addEventListener("scroll", scrollHandler);