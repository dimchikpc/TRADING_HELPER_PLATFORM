const defaultOptions = {
    colors: ['#eaecef', '#0ecb81', '#f6465d'],
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.6,
            opacityTo: 1,
        }
    },
    chart: {
        type: 'area',
        background: '#161a1e',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
        show: false,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    yaxis: {
        labels: {
            show: false,
            minWidth: 0,
            maxWidth: 0,
        },
    },
    axisBorder: {
        show: false,
    },
    legend: {
        offsetY: 8,
    },
    xaxis: {
        labels: {
            show: false,
        },
        tickAmount: 1000,
    },
    title: {
        text: '',
        align: 'left',
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            fontFamily:  "'IBM Plex Sans', sans-serif",
            color:  '#eaecef'
        },
    },
    theme: {
        mode: 'dark',
    },
    tooltip: {
        fixed: {
            enabled: true,
            position: 'topLeft',
        },
        x: {
            format: 'dd/MM/yy HH:mm'
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            let html = ''
            console.log('w.globals', w.globals)
            w.globals.initialSeries.forEach(i => {
                if (i.name === 'Crypto Fear & Greed Index') {
                    html+=`<li>${i.name} <b class="subtitle-2 py-2">${i.data[dataPointIndex]}</b></li>`
                } else {
                    html+=`<li><b>${i.name} </b><br>${i.data[dataPointIndex]}</li>`
                }
            })
            return `<ul>${html}</ul>`
        }
    }

}

export default (chartOptions = {}) => {
    return { ...defaultOptions, ...chartOptions }
}
