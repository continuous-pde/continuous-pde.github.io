// const svgContainer = d3.select("#svg-container");
var svg2 = d3.select("#svg-container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", [0, 0, 1000, 400]);


const SCROLL_LENGTH = 400;
const SCROLL_DELAY = SCROLL_LENGTH * 2;

const hrElement = document.getElementById("hr");
const OFFSET = hrElement.offsetTop;
// console.log(OFFSET)


d3.xml("assets/model.svg")
    .then(data => {
        svg2.node().append(data.documentElement);

        const initialcondition = svg2.selectAll("#initialcondition");
        const physicsBackbone = svg2.selectAll("#physicsbackbone");
        const encoder = svg2.selectAll("#encoder");
        const dots1 = svg2.selectAll("#dots1");
        const gnn1 = svg2.selectAll("#gnn1");
        const gnn2 = svg2.selectAll("#gnn2");
        const gnn3 = svg2.selectAll("#gnn3");
        const dyninterp = svg2.selectAll("#dyninterp");
        const mha1 = svg2.selectAll("#mha1");
        const mha2 = svg2.selectAll("#mha2");
        const mha3 = svg2.selectAll("#mha3");
        const dots2 = svg2.selectAll("#dots2");
        const input = svg2.selectAll("#input");
        const posenc = svg2.selectAll("#posenc");
        const gru1 = svg2.selectAll("#gru1");
        const gru2 = svg2.selectAll("#gru2");
        const gru3 = svg2.selectAll("#gru3");
        const prediction1 = svg2.selectAll("#prediction1");
        const prediction2 = svg2.selectAll("#prediction2");
        const prediction3 = svg2.selectAll("#prediction3");
        const output = svg2.selectAll("#output");

        const text_input = d3.select("#text_input")

        // Set opacity of everything to 0
        initialcondition.style("opacity", 0);
        physicsBackbone.style("opacity", 0);
        encoder.style("opacity", 0);
        dots1.style("opacity", 0);
        gnn1.style("opacity", 0);
        gnn2.style("opacity", 0);
        gnn3.style("opacity", 0);
        dyninterp.style("opacity", 0);
        mha1.style("opacity", 0);
        mha2.style("opacity", 0);
        mha3.style("opacity", 0);
        dots2.style("opacity", 0);
        input.style("opacity", 0);
        posenc.style("opacity", 0);
        gru1.style("opacity", 0);
        gru2.style("opacity", 0);
        gru3.style("opacity", 0);
        prediction1.style("opacity", 0);
        prediction2.style("opacity", 0);
        prediction3.style("opacity", 0);
        output.style("opacity", 0);
        text_input.style('opacity', 0)


        function handleScroll() {
            const OFFSET = hrElement.offsetTop;
            const currentScrollPos = window.pageYOffset -OFFSET;

            if (currentScrollPos < 0) {
                d3.select("#svg-container").style("position", "absolute")
                d3.select("#text_container").style("position", "absolute")
            }else{
                d3.select("#svg-container").style("position", "fixed")
                d3.select("#text_container").style("position", "fixed")
            }

            const opacity_scale = d3.scaleLinear().domain([0, SCROLL_LENGTH]).range([0, 1]).clamp(true);
            const translateY_scale = d3.scaleLinear().domain([SCROLL_LENGTH, 0]).range([0, 100]).clamp(true)
            const translateY_scale_inv = d3.scaleLinear().domain([0, SCROLL_LENGTH]).range([-100, 0]).clamp(true)

            initialcondition.style("opacity", opacity_scale(currentScrollPos));
            initialcondition.attr("transform", `translate(0, ${translateY_scale(currentScrollPos)})`);

            physicsBackbone.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY));
            physicsBackbone.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY)})`);

            encoder.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 1.2));
            encoder.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 1.2)})`);

            gnn1.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 3));
            gnn1.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 3)})`);

            gnn2.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 3.2));
            gnn2.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 3.2)})`);

            gnn3.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 3.4));
            gnn3.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 3.4)})`);

            dots1.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 3.6));
            // dots1.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 2.6)})`);

            dyninterp.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 5));
            dyninterp.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 5)})`);

            mha1.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 5.2));
            mha1.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 5.2)})`);

            mha2.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 5.4));
            mha2.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 5.4)})`);

            mha3.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 5.6));
            mha3.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 5.6)})`);

            dots2.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 5.6));

            input.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 7));
            input.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 7)})`);

            posenc.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 7.2));
            posenc.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 7.2)})`);

            gru1.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 8));
            gru1.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 8)})`);

            gru2.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 8.2));
            gru2.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 8.2)})`);

            gru3.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 8.4));
            gru3.attr("transform", `translate(0, ${translateY_scale_inv(currentScrollPos - SCROLL_DELAY * 8.4)})`);

            output.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 9));
            output.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 9)})`);

            prediction1.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 10));
            prediction1.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 10)})`);

            prediction2.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 10.2));
            prediction2.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 10.2)})`);

            prediction3.style("opacity", opacity_scale(currentScrollPos - SCROLL_DELAY * 10.4));
            prediction3.attr("transform", `translate(0, ${translateY_scale(currentScrollPos - SCROLL_DELAY * 10.4)})`);
        }

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);
    });

const paragraphs = [
    "The model input is a sparse observation pointcloud scattered across the entire simulation domain. The measurement points are static, and does not change during training, validation and test. ",
    "Our physics backbone operates as auto-regressive forecaster, tied to the observation grid. We encode the point cloud into a mesh.",
    "We advance the states at each measurement point by applying a multi-layered graph neural network in the latent space. This step results in a set of latent prediction at some user-defined anchor time steps.",
    "Time and space continuity is handle by the dynamical interpolator. We used Multi-head attention to interpolate the solutions from the physics backbone to new points.",
    "Following advances in geometric mappings in computer vision, we resort to multi-head attention (MHA) to relate each query point to the nodes (tokens) in the latent embedding. Here, attention is computed for a single query coordinate over the nodes in the mesh, corresponding to Keys.",
    "We further smooth these predictions with a Gated Recurrent Unit (GRU).",
    "The final vector is then decoded into the solution at the queried point in space and time using an MLP.",
    "We add additional grounding of the representation from the physics backbone to physical states by supervising an auxiliary head which predicts the desired PDE solution at the points provided by the initial condition, albeit at future time instants. This loss bypasses the interpolator and leads to shorter back-propagation paths."
];

const text = d3.select("#text");

function scrollHandler() {
    const currentScrollPos = window.pageYOffset -OFFSET;
    // console.log(currentScrollPos);
    if (currentScrollPos < SCROLL_DELAY) {
        text.text(paragraphs[0])
        const opacity_scale_text = d3.scaleLinear().domain([0, SCROLL_LENGTH]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < SCROLL_DELAY + SCROLL_LENGTH / 2) {
        text.text(paragraphs[0])
        const opacity_scale_text = d3.scaleLinear().domain([SCROLL_DELAY, SCROLL_DELAY + SCROLL_LENGTH / 2]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 3 * SCROLL_DELAY) {
        text.text(paragraphs[1])
        const opacity_scale_text = d3.scaleLinear().domain([SCROLL_DELAY + SCROLL_LENGTH / 2, SCROLL_DELAY + SCROLL_LENGTH]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 3 * SCROLL_DELAY + SCROLL_LENGTH / 2) {
        text.text(paragraphs[1])
        const opacity_scale_text = d3.scaleLinear().domain([SCROLL_DELAY * 3, SCROLL_DELAY * 3 + SCROLL_LENGTH / 2]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 4000) {
        text.text(paragraphs[2])
        const opacity_scale_text = d3.scaleLinear().domain([SCROLL_DELAY * 3 + SCROLL_LENGTH / 2, SCROLL_DELAY * 3 + SCROLL_LENGTH]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 4000 + 200) {
        text.text(paragraphs[2])
        const opacity_scale_text = d3.scaleLinear().domain([4000, 4200]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 5800) {
        text.text(paragraphs[3])
        const opacity_scale_text = d3.scaleLinear().domain([4200, 4400]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 5900) {
        text.text(paragraphs[3])
        const opacity_scale_text = d3.scaleLinear().domain([5800, 5900]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 6600) {
        text.text(paragraphs[4])
        const opacity_scale_text = d3.scaleLinear().domain([5900, 6000]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 6700) {
        text.text(paragraphs[4])
        const opacity_scale_text = d3.scaleLinear().domain([6600, 6700]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 7200) {
        text.text(paragraphs[5])
        const opacity_scale_text = d3.scaleLinear().domain([6700, 6800]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 7300) {
        text.text(paragraphs[5])
        const opacity_scale_text = d3.scaleLinear().domain([7200, 7300]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 8000) {
        text.text(paragraphs[6])
        const opacity_scale_text = d3.scaleLinear().domain([7300, 7400]).range([0, 1]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 8200) {
        text.text(paragraphs[6])
        const opacity_scale_text = d3.scaleLinear().domain([8000, 8200]).range([1, 0]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    } else if (currentScrollPos < 10000) {
        text.text(paragraphs[7])
        const opacity_scale_text = d3.scaleLinear().domain([8200, 8400]).range([0, 4]).clamp(true);
        text.style('opacity', opacity_scale_text(currentScrollPos));
    }


}

window.addEventListener("scroll", scrollHandler);