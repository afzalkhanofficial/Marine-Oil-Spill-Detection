// Table ---------------------------------------------------------------------->
document.addEventListener("DOMContentLoaded", function () {
    // Select modal elements from the DOM
    const modal = document.getElementById("detailsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDetails = document.getElementById("modalDetails");
    const modalClose = document.getElementById("modalClose");

    // Add click event to each table row
    document.querySelectorAll("#oilSpillTable tbody tr").forEach((row) => {
        row.addEventListener("click", function () {
            // Get data attributes from the clicked row
            const ship = this.getAttribute("data-ship");
            const year = this.getAttribute("data-year");
            const location = this.getAttribute("data-location");
            const size = this.getAttribute("data-size");
            const detail = this.getAttribute("data-detail");

            // Set modal title and details with the retrieved data
            modalTitle.innerText = `Oil Spill Details - ${ship}`;
            modalDetails.innerHTML = `
                <p><strong>Shipname:</strong> ${ship}</p>
                <p><strong>Year of Incident:</strong> ${year}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Spill Size:</strong> ${size} tonnes</p>
                <p><strong>Description:</strong> ${detail}</p>
            `;
            modal.style.display = "flex";
        });
    });

    // Close modal when clicking the close button
    modalClose.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


// Chart ---------------------------------------------------------------------->
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  let historyChart; // To hold our Chart instance
  
  // Function to create/update the chart with new data
  function renderChart(years, largeSpills, mediumSpills) {
      // If the chart already exists, destroy it before creating a new one
      if (historyChart) {
          historyChart.destroy();
      }
  
      historyChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: years,
              datasets: [
                  {
                      label: 'Large Oil Spills (>700 tonnes)',
                      data: largeSpills,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      fill: true
                  },
                  {
                      label: 'Medium Oil Spills (7-700 tonnes)',
                      data: mediumSpills,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2,
                      fill: true
                  }
              ]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  x: {
                      ticks: {
                          color: '#e0e0e0'
                      },
                      grid: {
                          color: 'rgba(255,255,255,0.1)'
                      }
                  },
                  y: {
                      ticks: {
                          color: '#e0e0e0'
                      },
                      grid: {
                          color: 'rgba(255,255,255,0.1)'
                      }
                  }
              },
              plugins: {
                  legend: {
                      labels: {
                          color: '#e0e0e0'
                      }
                  }
              }
          }
      });
  }
  
  // Embedded CSV data from the DOCUMENT
  const csvData = `Entity,Code,Year,Large oil spills (>700 tonnes),Medium oil spills (7-700 tonnes)
World,OWID_WRL,1970,29,7
World,OWID_WRL,1971,14,18
World,OWID_WRL,1972,27,48
World,OWID_WRL,1973,31,28
World,OWID_WRL,1974,27,90
World,OWID_WRL,1975,20,96
World,OWID_WRL,1976,26,67
World,OWID_WRL,1977,16,70
World,OWID_WRL,1978,23,59
World,OWID_WRL,1979,32,60
World,OWID_WRL,1980,13,52
World,OWID_WRL,1981,7,54
World,OWID_WRL,1982,4,46
World,OWID_WRL,1983,13,52
World,OWID_WRL,1984,8,26
World,OWID_WRL,1985,8,33
World,OWID_WRL,1986,7,27
World,OWID_WRL,1987,11,27
World,OWID_WRL,1988,10,11
World,OWID_WRL,1989,13,32
World,OWID_WRL,1990,14,50
World,OWID_WRL,1991,7,30
World,OWID_WRL,1992,10,31
World,OWID_WRL,1993,11,31
World,OWID_WRL,1994,9,26
World,OWID_WRL,1995,3,20
World,OWID_WRL,1996,3,20
World,OWID_WRL,1997,10,28
World,OWID_WRL,1998,5,25
World,OWID_WRL,1999,5,20
World,OWID_WRL,2000,4,21
World,OWID_WRL,2001,3,18
World,OWID_WRL,2002,3,11
World,OWID_WRL,2003,4,19
World,OWID_WRL,2004,5,20
World,OWID_WRL,2005,3,22
World,OWID_WRL,2006,4,12
World,OWID_WRL,2007,3,12
World,OWID_WRL,2008,1,7
World,OWID_WRL,2009,2,7
World,OWID_WRL,2010,4,5
World,OWID_WRL,2011,1,4
World,OWID_WRL,2012,0,7
World,OWID_WRL,2013,3,5
World,OWID_WRL,2014,1,4
World,OWID_WRL,2015,2,6
World,OWID_WRL,2016,1,4
World,OWID_WRL,2017,2,4
World,OWID_WRL,2018,3,4
World,OWID_WRL,2019,1,2
World,OWID_WRL,2020,0,4
World,OWID_WRL,2021,1,5
World,OWID_WRL,2022,3,4
World,OWID_WRL,2023,1,9
`;
  
  // Parse the embedded CSV data and render the chart
  Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
          const data = results.data;
          // Sort by year to ensure chronological order (optional but recommended)
          data.sort((a, b) => a.Year - b.Year);
          // Extract arrays for chart
          const years = data.map(row => row.Year);
          const largeSpills = data.map(row => row["Large oil spills (>700 tonnes)"]);
          const mediumSpills = data.map(row => row["Medium oil spills (7-700 tonnes)"]);
          // Render the chart with the extracted data
          renderChart(years, largeSpills, mediumSpills);
      },
      error: function(error) {
          console.error("Error parsing CSV:", error);
      }
  });
});