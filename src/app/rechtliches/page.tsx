import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import SectionDivider from "@/components/SectionDivider";
import FadeIn from "@/components/FadeIn";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Shared prose styles — text capped at readable width ─── */
const prose = "text-[16px] leading-[1.7] text-muted";
const h3Style = "mt-10 text-[18px] font-semibold tracking-[-0.01em] text-white";
/* hr spans the full container width (matching the yellow SectionDivider line) */
const hrStyle = "my-8 border-t border-border";

/* ─── Datenschutzerklärung ─── */
function Datenschutz() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={`${cx}`}>
        <FadeIn delay={60}>
          <div className="mt-0">

            {/* 01 */}
            <h3 className={`${h3Style} max-w-[800px]`}>01 — Wer sind wir?</h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Für die Datenbearbeitungen nach dieser Datenschutzerklärung ist
              grundsätzlich das folgende Unternehmen verantwortlich
              („wir" oder „uns"):
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              <strong className="text-white font-medium">
                The Luka Dosen Labs
              </strong>
              <br />
              Bahnhofstrasse 11
              <br />
              7302 Landquart
            </p>

            <hr className={hrStyle} />

            {/* 02 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              02 — Welche Personendaten bearbeiten wir zu welchen Zwecken?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Je nach Anlass und Zweck bearbeiten wir unterschiedliche
              Personendaten.
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Ihre Personendaten erheben wir grundsätzlich direkt von Ihnen,
              z.B. wenn Sie uns Personendaten übermitteln, wenn Sie
              Dienstleistungen von uns beziehen und wenn Sie mit uns
              kommunizieren. Dies ist bspw. der Fall, wenn Sie uns bei
              Erstellung des Nutzerkontos Ihre E-Mail-Adresse, Ihren Vor- und
              Nachnamen, Ihre Adresse und Ihren (Wohn-)Sitz mitteilen.
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Personendaten können aber auch aus anderen Quellen erhoben
              werden. Letzteres betrifft insbesondere die folgenden Daten und
              Quellen:
            </p>
            <ul className={`mt-4 max-w-[800px] space-y-2 ${prose} list-disc list-outside ml-5`}>
              <li>
                Angaben aus öffentlichen Registern, z.B. dem
                Betreibungsregister, und von Behörden;
              </li>
              <li>
                Angaben von privaten Informationsanbietern wie z.B.
                Wirtschaftsauskunfteien;
              </li>
              <li>
                Anbietern von Online-Diensten, z.B. Anbietern von
                Internet-Analysediensten, die auf unserer Webseite
                Informationen erheben und für Auswertungen verwenden;
              </li>
              <li>
                Angaben von Finanzdienstleistern, wenn Sie Zahlungen an uns
                durchführen;
              </li>
              <li>
                Angaben, die wir aus einem Unternehmen erhalten, für das Sie
                tätig sind, z.B. Name, Kontaktangaben, Titel, Funktion etc.;
              </li>
              <li>
                Angaben über Sie, die andere Personen uns mitteilen, z.B. im
                Rahmen eines behördlichen oder gerichtlichen Verfahrens oder
                im Rahmen der Kommunikation mit uns.
              </li>
            </ul>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Wir bearbeiten Ihre Personendaten in erster Linie dazu, um
              unsere Dienstleistungen anzubieten und zur Erbringung der
              nachfolgend genannten Zwecke:
            </p>
            <ul className={`mt-4 max-w-[800px] space-y-2 ${prose} list-disc list-outside ml-5`}>
              <li>zur Kommunikation mit Ihnen und mit Dritten;</li>
              <li>
                zur Bereitstellung, Verwaltung, Sicherung und
                Personalisierung von Webseiten, Apps, Online-Angeboten und
                anderer Infrastruktur;
              </li>
              <li>um Verträge mit Ihnen abzuschliessen und abzuwickeln;</li>
              <li>
                um Verträge mit unseren Lieferanten, Kunden und
                Geschäftspartnern abzuschliessen und abzuwickeln, mit denen
                Sie in Verbindung stehen und für Customer Relationship
                Management;
              </li>
              <li>
                für Werbung und Marketing, z.B. zur Durchführung von
                Anlässen, Wettbewerben u. dgl. und für den Versand
                zielgruppengerechter Informationen;
              </li>
              <li>
                zur Verwaltung und Bewirtschaftung unserer IT- und anderen
                Ressourcen;
              </li>
              <li>
                für Buchhaltungs-, Archivierungs-, Ausbildungs- und sonstige
                Administrationszwecke;
              </li>
              <li>zur Prüfung und Verbesserung unserer internen Abläufe;</li>
              <li>
                zur Prüfung und Einhaltung rechtlicher Verpflichtungen, auch
                von Anordnungen eines Gerichts oder einer Behörde;
              </li>
              <li>
                zur Compliance und zur Aufdeckung, Abklärung und Verhinderung
                von Missbräuchen;
              </li>
              <li>
                zur Durchsetzung unserer Ansprüche und von Ansprüchen
                verbundener Unternehmen und zur Abwehr von Ansprüchen gegen
                uns vor Gerichten und Behörden im In- und Ausland.
              </li>
            </ul>

            <hr className={hrStyle} />

            {/* 03 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              03 — Wem geben wir Ihre Personendaten weiter?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Unsere Mitarbeiter haben Zugriff auf Personendaten, soweit dies
              für die beschriebenen Zwecke und die Tätigkeit der betreffenden
              Mitarbeiter erforderlich ist. Dazu gehören Mitarbeiter im
              Support- und Marketingbereich. Sie handeln dabei nach unseren
              Weisungen und sind im Umgang mit Ihren Personendaten zu
              Vertraulichkeit und Verschwiegenheit verpflichtet.
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Wir können Ihre Personendaten ausserdem an Dritte weitergeben,
              wenn wir deren Dienstleistungen in Anspruch nehmen wollen
              (z.B. IT-Dienstleister). Das betrifft z.B. die folgenden Fälle:
            </p>
            <ul className={`mt-4 max-w-[800px] space-y-2 ${prose} list-disc list-outside ml-5`}>
              <li>
                Wenn wir Transaktionen wie Unternehmenszusammenschlüsse oder
                den Erwerb oder Verkauf einzelner Teile eines Unternehmens
                prüfen oder durchführen, müssen wir in diesem Zusammenhang
                Personendaten an ein anderes Unternehmen übermitteln.
              </li>
              <li>
                Wir können Ihre Personendaten Dritten offenlegen (z.B.
                Gerichten und Behörden in der Schweiz und im Ausland), wenn
                dies gesetzlich vorgeschrieben ist.
              </li>
              <li>
                Wir können Forderungen gegen Sie an andere Unternehmen wie
                z.B. Inkassounternehmen übertragen.
              </li>
            </ul>

            <hr className={hrStyle} />

            {/* 04 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              04 — Wann geben wir Ihre Personendaten ins Ausland bekannt?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Die Empfänger Ihrer Personendaten können sich jeweils auch im
              Ausland befinden, auch ausserhalb der Schweiz bzw. der Länder
              der EU und des Europäischen Wirtschaftsraums (EWR). Wenn wir
              Ihre Personendaten in einen solchen Staat übermitteln wollen,
              müssen wir den Schutz Ihrer Personendaten in angemessener Weise
              sicherstellen. Bitte kontaktieren Sie uns, falls Sie eine Kopie
              unserer Datenübermittlungsverträge wünschen.
            </p>

            <hr className={hrStyle} />

            {/* 05 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              05 — Wie bearbeiten wir Personendaten im Zusammenhang mit
              Webseiten, Apps und E-Mail-Newslettern?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Wenn Sie unsere Webseite und App besuchen bzw. verwenden,
              bearbeiten wir technische Daten, z.B. Angaben über den Zeitpunkt
              des Zugriffs auf unsere Webseite, die Dauer des Besuchs, die
              aufgerufenen Seiten und Angaben über das verwendete Endgerät,
              damit wir die Webseite bereitstellen können, aus Gründen der
              IT-Sicherheit und zur Verbesserung der Nutzerfreundlichkeit. Wir
              verwenden zudem „Cookies", also Dateien, die auf Ihrem Endgerät
              gespeichert werden, wenn Sie unsere Webseite besuchen, und
              ähnliche Technologien.
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Ein Beispiel für einen Dienst zur statistischen Auswertung ist
              Google Analytics, ein Angebot von Google in USA. Google verwendet
              Cookies, um Informationen über Ihr Verhalten auf unserer Webseite
              zu erheben. Sie können die Verwendung von Google Analytics durch
              ein „Browser Add-on" verhindern, das Sie unter{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                tools.google.com/dlpage/gaoptout
              </a>{" "}
              installieren können.
            </p>

            <hr className={hrStyle} />

            {/* 06 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              06 — Wie lange speichern wir Ihre Personendaten?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Wir speichern Ihre Personendaten in personenbezogener Form,
              solange es für den konkreten Zweck, für den wir sie erhoben
              haben, erforderlich ist, bei Verträgen in der Regel zumindest
              für die Dauer der Vertragsbeziehung. Wir speichern Personendaten
              ferner, wenn wir ein berechtigtes Interesse an der Speicherung
              haben, z.B. zu Dokumentations- und Beweissicherungszwecken.
            </p>

            <hr className={hrStyle} />

            {/* 07 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              07 — Wie schützen wir Ihre Personendaten?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Wir treffen angemessene Sicherheitsmassnahmen technischer Natur
              (z.B. Verschlüsselung, Pseudonymisierung, Protokollierung,
              Zugriffsbeschränkung, Datensicherung etc.) und organisatorischer
              Natur (z.B. Weisungen an unsere Mitarbeiter,
              Vertraulichkeitsvereinbarungen, Überprüfungen etc.), um die
              Sicherheit Ihrer Personendaten zu wahren und der Gefahr des
              Verlusts, einer unbeabsichtigten Veränderung oder eines
              unberechtigten Zugriffs entgegenzuwirken.
            </p>

            <hr className={hrStyle} />

            {/* 08 */}
            <h3 className={`${h3Style} max-w-[800px]`}>
              08 — Welche Rechte haben Sie im Zusammenhang mit der Bearbeitung
              Ihrer Personendaten?
            </h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Sie können Datenbearbeitungen jederzeit widersprechen, besonders
              Datenbearbeitungen im Zusammenhang mit Direktwerbung. Im Rahmen
              des auf Sie anwendbaren Rechts haben Sie zudem das Recht auf
              Auskunft, Berichtigung, Löschung, auf Einschränkung der
              Datenbearbeitung und auf Widerspruch gegen unsere
              Datenbearbeitungen und das Recht, von uns die Personendaten,
              welche Sie uns bereitgestellt haben, unentgeltlich in einem
              lesbaren Format zu erhalten. Sie haben zudem das Recht,
              Einwilligungen zu widerrufen, ohne dass dadurch die
              Rechtmässigkeit der bis zum Widerruf erfolgten Datenbearbeitung
              berührt wird. Sie können zudem bei der zuständigen
              Datenschutzbehörde eine Beschwerde einreichen.
            </p>

            <hr className={hrStyle} />

            {/* 09 */}
            <h3 className={`${h3Style} max-w-[800px]`}>09 — Was ist sonst zu beachten?</h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Bei der Bearbeitung Ihrer Personendaten stützen wir uns
              insbesondere auf folgende Grundlagen:
            </p>
            <ul className={`mt-4 max-w-[800px] space-y-2 ${prose} list-disc list-outside ml-5`}>
              <li>
                Die Erfüllung eines Vertrags mit der betroffenen Person oder
                für vorvertragliche Massnahmen auf ihre Anfrage;
              </li>
              <li>
                berechtigte Interessen; dazu gehört z.B. das Interesse an der
                Kundenbetreuung und der Kommunikation mit Kunden auch
                ausserhalb eines Vertrags; an Marketing-Aktivitäten; an der
                Betrugsbekämpfung und der Verhinderung und Untersuchung von
                Delikten; am Schutz von Kunden, Mitarbeitern und anderen
                Personen und Daten; an der Gewährleistung der IT-Sicherheit;
              </li>
              <li>auf eine Einwilligung, sofern wir sie gesondert einholen;</li>
              <li>ein Erfordernis zur Einhaltung von Rechtsvorschriften.</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Impressum ─── */
function Impressum() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Impressum" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn delay={60}>
          <div className="mt-0">

            {/* 01 */}
            <h3 className={`${h3Style} max-w-[800px]`}>01 — Kontaktadresse</h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              <strong className="text-white font-medium">Projecti</strong>
              <br />
              c/o The Luka Dosen Labs
              <br />
              Bahnhofstrasse 11
              <br />
              7302 Landquart
              <br />
              Schweiz
            </p>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              E-Mail:{" "}
              <a
                href="mailto:luka@projecti.ch"
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                luka@projecti.ch
              </a>
              <br />
              Web:{" "}
              <a
                href="https://www.projecti.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                www.projecti.ch
              </a>
            </p>

            <hr className={hrStyle} />

            {/* 02 */}
            <h3 className={`${h3Style} max-w-[800px]`}>02 — Vertretungsberechtigte Personen</h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>Luka Došen</p>

            <hr className={hrStyle} />

            {/* 03 */}
            <h3 className={`${h3Style} max-w-[800px]`}>03 — Handelsregistereintrag</h3>
            <p className={`mt-4 max-w-[800px] ${prose}`}>
              Eingetragener Firmenname: The Luka Dosen Labs
              <br />
              UID: CHE-461.710.564
              <br />
              Handelsregisteramt: Chur
            </p>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function RechtlichesPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Rechtliches"
          headline="Datenschutz & Impressum"
          subheadline="© Projecti | Landquart, 07.01.2025"
        />
        <Datenschutz />
        <Impressum />
      </main>
      <Footer />
    </>
  );
}
