"""
Script de análise do Radar de Candidaturas.

Ele conecta no MySQL, lê a view vw_job_overview, cria um CSV tratado
em exports/ e gera gráficos simples em PNG.

Uso:
    python analyze_jobs.py
"""

from pathlib import Path
import os

import matplotlib.pyplot as plt
import pandas as pd
import mysql.connector
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[1]
EXPORT_DIR = ROOT_DIR / "exports"
EXPORT_DIR.mkdir(exist_ok=True)

# Reaproveita o .env do backend, para não duplicar configuração.
load_dotenv(ROOT_DIR / "backend" / ".env")


def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "career_insight_hub"),
        port=int(os.getenv("DB_PORT", "3306")),
    )


def load_dataset() -> pd.DataFrame:
    query = "SELECT * FROM vw_job_overview"
    connection = get_connection()
    try:
        return pd.read_sql(query, connection)
    finally:
        connection.close()


def save_csv(df: pd.DataFrame) -> None:
    output_path = EXPORT_DIR / "radar_candidaturas.csv"
    df.to_csv(output_path, index=False, encoding="utf-8")
    print(f"CSV exportado em: {output_path}")


def plot_count(df: pd.DataFrame, column: str, title: str, filename: str) -> None:
    counts = df[column].fillna("Não informado").value_counts().sort_values(ascending=True)

    plt.figure(figsize=(8, 4.5))
    counts.plot(kind="barh")
    plt.title(title)
    plt.xlabel("Quantidade")
    plt.ylabel("")
    plt.tight_layout()

    output_path = EXPORT_DIR / filename
    plt.savefig(output_path, dpi=140)
    plt.close()
    print(f"Gráfico exportado em: {output_path}")


def plot_boolean(df: pd.DataFrame, column: str, title: str, filename: str) -> None:
    readable = df[column].map({1: "Sim", 0: "Não", True: "Sim", False: "Não"}).fillna("Não informado")
    counts = readable.value_counts().sort_values(ascending=True)

    plt.figure(figsize=(7, 4))
    counts.plot(kind="barh")
    plt.title(title)
    plt.xlabel("Quantidade")
    plt.ylabel("")
    plt.tight_layout()

    output_path = EXPORT_DIR / filename
    plt.savefig(output_path, dpi=140)
    plt.close()
    print(f"Gráfico exportado em: {output_path}")


def main():
    df = load_dataset()

    if df.empty:
        print("Nenhuma vaga encontrada no banco.")
        return

    save_csv(df)
    plot_count(df, "area", "Vagas por área", "vagas_por_area.png")
    plot_count(df, "status", "Candidaturas por status", "candidaturas_por_status.png")
    plot_count(df, "work_model", "Vagas por modelo de trabalho", "vagas_por_modelo.png")
    plot_boolean(df, "requires_degree", "Vagas que exigem graduação", "vagas_exigem_graduacao.png")
    plot_boolean(df, "requires_driver_license", "Vagas que exigem CNH", "vagas_exigem_cnh.png")
    plot_boolean(df, "english_required", "Vagas que exigem inglês", "vagas_exigem_ingles.png")

    if "fit_score" in df.columns and df["fit_score"].notna().any():
        print(f"Aderência média: {df['fit_score'].mean():.1f}%")

    print("Análise concluída.")


if __name__ == "__main__":
    main()
