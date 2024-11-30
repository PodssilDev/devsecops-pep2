import json
from jinja2 import Template

# Leer el archivo JSON
with open("sonar-report.json", "r") as file:
    data = json.load(file)

# Template HTML
html_template = """
<html>
    <head><title>SonarQube Report</title></head>
    <body>
        <h1>SonarQube Analysis Report</h1>
        <ul>
            <li><strong>Bugs:</strong> {{ bugs }}</li>
            <li><strong>Vulnerabilities:</strong> {{ vulnerabilities }}</li>
            <li><strong>Code Smells:</strong> {{ code_smells }}</li>
            <li><strong>Coverage:</strong> {{ coverage }}%</li>
            <li><strong>Duplicated Lines:</strong> {{ duplicated_lines }}%</li>
        </ul>
    </body>
</html>
"""
template = Template(html_template)

# Extraer métricas
metrics = {m['metric']: m['value'] for m in data['component']['measures']}
html_content = template.render(
    bugs=metrics.get("bugs", "N/A"),
    vulnerabilities=metrics.get("vulnerabilities", "N/A"),
    code_smells=metrics.get("code_smells", "N/A"),
    coverage=metrics.get("coverage", "N/A"),
    duplicated_lines=metrics.get("duplicated_lines_density", "N/A")
)

# Guardar el HTML
with open("sonar-report.html", "w") as file:
    file.write(html_content)
