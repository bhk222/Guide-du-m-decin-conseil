export interface AldItem {
  code: string;
  name: string;
  children?: AldItem[];
  tooltip?: string; // Description détaillée affichée au survol
}

// Source: Nouvelle nomenclature codifiée des ALD
export const aldData: AldItem[] = [
  {
    code: "C01",
    name: "Tuberculoses sous toutes ses formes",
    children: [
      {
        code: "C01A",
        name: "Tuberculose pleuro-pulmonaire",
        children: [
          { 
            code: "C01A01", 
            name: "Tuberculose pulmonaire",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">TUBERCULOSE PULMONAIRE — Diagnostic et Traitement</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 1. Définition</h4>
                <p class="text-sm">La tuberculose pulmonaire (TBP) est une infection chronique due à <strong>Mycobacterium tuberculosis</strong> (bacille de Koch), atteignant principalement le parenchyme pulmonaire. C'est une maladie contagieuse, à transmission aérienne (gouttelettes infectées lors de la toux, parole, éternuement).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 2. Physiopathologie</h4>
                <p class="text-sm">Le bacille inhalé atteint les alvéoles → phagocyté par les macrophages.<br>
                Deux évolutions possibles :<br>
                • Guérison spontanée ou latence (forme quiescente, non contagieuse)<br>
                • Réactivation (endogène) ou infection primaire évolutive → tuberculose pulmonaire active et contagieuse.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 3. Tableau Clinique</h4>
                <p class="text-sm font-semibold">Forme commune (TB pulmonaire post-primaire)</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Toux chronique (>3 semaines)</li>
                  <li>Expectorations ± hémoptysie</li>
                  <li>Fièvre vespérale, sueurs nocturnes</li>
                  <li>Amaigrissement, asthénie, anorexie</li>
                  <li>Douleurs thoraciques (parfois)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 4. Examens complémentaires</h4>
                <p class="text-sm"><strong>a. Radiographie thoracique</strong><br>
                Images typiques : infiltrats apico-posterieurs, cavernes, nodules, ou lésions rétractiles.<br>
                Localisation préférentielle : lobes supérieurs, segment apical du lobe inférieur.</p>
                
                <p class="text-sm mt-2"><strong>b. Bacilloscopie (examen clé)</strong><br>
                Recherche du BK dans les expectorations (au moins 2 prélèvements matinaux).<br>
                Coloration de Ziehl-Neelsen : bacilles acido-alcoolo-résistants (BAAR).<br>
                Si positive → tuberculose contagieuse.</p>
                
                <p class="text-sm mt-2"><strong>c. Test moléculaire rapide (GeneXpert)</strong><br>
                Détection ADN du Mycobacterium tuberculosis + résistance à la rifampicine.<br>
                Résultat rapide (en 2 h).</p>
                
                <p class="text-sm mt-2"><strong>d. Culture sur milieu de Löwenstein-Jensen</strong><br>
                Référence diagnostique (très sensible), mais lente (3 à 8 semaines).</p>
                
                <p class="text-sm mt-2"><strong>e. Autres tests</strong><br>
                IDR à la tuberculine ou test IGRA (intérêt dans les formes latentes)<br>
                Scanner thoracique si doute diagnostique ou formes atypiques.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 5. Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Cancers bronchopulmonaires</li>
                  <li>Bronchite chronique ou abcès pulmonaire</li>
                  <li>Mycoses pulmonaires (aspergillose, histoplasmose)</li>
                  <li>Sarcoïdose</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 6. Traitement (schéma standard OMS / Algérie / France)</h4>
                <p class="text-sm"><strong>a. Phase intensive (2 mois)</strong><br>
                ➡️ 4 médicaments :<br>
                • Rifampicine (R)<br>
                • Isoniazide (H)<br>
                • Pyrazinamide (Z)<br>
                • Ethambutol (E)<br>
                👉 <strong>2RHZE pendant 2 mois</strong></p>
                
                <p class="text-sm mt-2"><strong>b. Phase de continuation (4 mois)</strong><br>
                ➡️ 2 médicaments :<br>
                • Rifampicine (R)<br>
                • Isoniazide (H)<br>
                👉 <strong>4RH pendant 4 mois</strong></p>
                
                <p class="text-sm mt-2 font-bold">🧾 Durée totale : 6 mois</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 7. Suivi thérapeutique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Surveillance clinique : toux, appétit, poids, fièvre.</li>
                  <li>Contrôle bacilloscopique à 2 mois, 5 mois, et fin de traitement.</li>
                  <li>Surveillance biologique : Fonction hépatique (risque d'hépatotoxicité), Acuité visuelle (si ethambutol), Acide urique (si pyrazinamide)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 8. Précautions et mesures de santé publique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Isolement respiratoire jusqu'à négativation de la bacilloscopie.</li>
                  <li>Dépistage des contacts familiaux.</li>
                  <li>Vaccination BCG des enfants (prévention primaire).</li>
                  <li>Déclaration obligatoire (maladie à déclaration obligatoire).</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 9. Formes particulières</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Tuberculose multirésistante (MDR-TB)</strong> : résistance à H + R → traitement prolongé (≥ 18 mois) avec fluoroquinolones et antituberculeux de 2e ligne.</li>
                  <li><strong>TB et VIH</strong> : interaction médicamenteuse avec antirétroviraux, surveillance renforcée.</li>
                  <li><strong>TB extrapulmonaire</strong> : pleurale, ganglionnaire, osseuse, méningée, etc.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 10. Pronostic</h4>
                <p class="text-sm">Bon si diagnostic précoce et observance stricte.<br>
                Risque de rechute ou résistance en cas d'interruption ou mauvaise observance.</p>
              </div>
            </div>`
          },
          { 
            code: "C01A02", 
            name: "Tuberculose pleurale",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧬 TUBERCULOSE PLEURALE – FICHE SYNTHÉTIQUE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔸 Définition</h4>
                <p class="text-sm">Forme extra-pulmonaire de la tuberculose due à <strong>Mycobacterium tuberculosis</strong>, caractérisée par une inflammation pleurale avec épanchement séro-fibrineux.<br>
                • Peut être isolée ou associée à une atteinte pulmonaire.<br>
                • Contagiosité faible sauf si foyer pulmonaire actif associé.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Physiopathologie</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Rupture d'un foyer sous-pleural caséeux dans la cavité pleurale.</li>
                  <li>Réaction immunitaire → épanchement riche en lymphocytes.</li>
                  <li>Résorption lente → parfois symphyse ou pachypleurite.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Clinique</h4>
                <p class="text-sm">Début souvent insidieux.</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Fièvre modérée, sueurs nocturnes, amaigrissement.</li>
                  <li>Douleur thoracique unilatérale, toux sèche, dyspnée progressive.</li>
                  <li>Diminution du murmure vésiculaire à l'auscultation, matité à la percussion.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Examens complémentaires</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Examen</th>
                      <th class="border border-slate-300 p-2 text-left">Résultats caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Radiographie thoracique</td>
                      <td class="border border-slate-300 p-2">Épanchement pleural unilatéral, souvent modéré à abondant.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Échographie pleurale</td>
                      <td class="border border-slate-300 p-2">Confirme l'épanchement et guide la ponction.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Ponction pleurale</td>
                      <td class="border border-slate-300 p-2">Liquide exsudatif, clair citronné, lymphocytaire, <strong>ADA élevée (>40 UI/L)</strong>, protéines >30 g/L, glucose bas.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Recherche BK</td>
                      <td class="border border-slate-300 p-2">Rarement positive dans le liquide ; faire PCR (GeneXpert) ou culture.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Biopsie pleurale</td>
                      <td class="border border-slate-300 p-2"><strong>Diagnostic de certitude</strong> : granulome épithélio-giganto-cellulaire avec nécrose caséeuse.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">IDR / IGRA</td>
                      <td class="border border-slate-300 p-2">Souvent positifs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Diagnostic</h4>
                <p class="text-sm">• <strong>Fortement évocateur si</strong> : épanchement lymphocytaire + ADA élevée + contexte tuberculeux.<br>
                • <strong>Confirmé par</strong> culture ou histologie pleurale.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Traitement antituberculeux</h4>
                <p class="text-sm font-semibold mb-2">Même schéma standard OMS :</p>
                <table class="text-xs w-full border-collapse mb-2">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Phase</th>
                      <th class="border border-slate-300 p-2 text-left">Médicaments</th>
                      <th class="border border-slate-300 p-2 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Intensive</td>
                      <td class="border border-slate-300 p-2">Rifampicine + Isoniazide + Pyrazinamide + Ethambutol (2RHZE)</td>
                      <td class="border border-slate-300 p-2">2 mois</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Continuation</td>
                      <td class="border border-slate-300 p-2">Rifampicine + Isoniazide (4RH)</td>
                      <td class="border border-slate-300 p-2">4 mois</td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-sm font-bold">🕒 Durée totale : 6 mois</p>
                <p class="text-sm mt-1">⚙️ Ponction évacuatrice possible si épanchement abondant ou gênant.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Surveillance</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Clinique</strong> : disparition douleur, fièvre, dyspnée.</li>
                  <li><strong>Biologique</strong> : enzymes hépatiques.</li>
                  <li><strong>Radiologique</strong> : contrôle après 1 à 3 mois.</li>
                </ul>
                <p class="text-sm mt-2">⚠️ <strong>Risque</strong> : pachypleurite résiduelle (épaississement pleural, restriction ventilatoire).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Pronostic</h4>
                <p class="text-sm">• Bon sous traitement complet.<br>
                • Séquelles possibles : symphyse pleurale, restriction respiratoire, rarement récidive.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Santé publique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Déclaration obligatoire.</li>
                  <li>Recherche systématique d'un foyer pulmonaire associé.</li>
                  <li>Dépistage des contacts.</li>
                </ul>
              </div>
            </div>`
          },
        ],
      },
      {
        code: "C01B",
        name: "Tuberculose extrapulmonaire",
        children: [
          { 
            code: "C01B01", 
            name: "Tuberculose du système nerveux",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 TUBERCULOSE DU SYSTÈME NERVEUX – FICHE SYNTHÉTIQUE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔸 Définition</h4>
                <p class="text-sm">Atteinte du système nerveux central par <strong>Mycobacterium tuberculosis</strong>, pouvant toucher :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>les méninges (méningite tuberculeuse, la plus fréquente),</li>
                  <li>le parenchyme cérébral (tuberculome),</li>
                  <li>exceptionnellement la moelle épinière (arachnoïdite, myélite).</li>
                </ul>
                <p class="text-sm mt-2">➡️ <strong>Forme grave de la tuberculose extra-pulmonaire</strong>, engageant souvent le pronostic vital et fonctionnel.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Physiopathologie</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Diffusion hématogène depuis un foyer pulmonaire ou ganglionnaire.</li>
                  <li>Formation de petits foyers tuberculeux (« granulomes de Rich ») à la base du cerveau → rupture → inflammation méningée intense avec exsudat basilaire.</li>
                  <li>Atteinte possible des nerfs crâniens et des vaisseaux (→ infarctus ischémique).</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Formes cliniques principales</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Forme</th>
                      <th class="border border-slate-300 p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Méningite tuberculeuse</td>
                      <td class="border border-slate-300 p-2">La plus fréquente, début insidieux, fièvre prolongée, céphalées, raideur méningée, troubles conscience.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Tuberculome cérébral</td>
                      <td class="border border-slate-300 p-2">Masse intracrânienne (syndrome d'hypertension intracrânienne, crises épileptiques, signes focaux).</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Arachnoïdite spinale</td>
                      <td class="border border-slate-300 p-2">Douleurs radiculaires, paraplégie progressive.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Tableau clinique typique (méningite tuberculeuse)</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Fièvre prolongée, altération de l'état général.</li>
                  <li>Céphalées intenses, vomissements, raideur méningée.</li>
                  <li>Troubles de conscience, confusion, somnolence.</li>
                  <li>Atteinte des nerfs crâniens (III, VI, VII).</li>
                  <li>Signes neurologiques focaux (AVC ischémique secondaire à artérite basilaire).</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Examens complémentaires</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Examen</th>
                      <th class="border border-slate-300 p-2 text-left">Résultats caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Ponction lombaire (LCR)</td>
                      <td class="border border-slate-300 p-2">Clair ou opalescent, pression ↑, <strong>lymphocytose (100–500/mm³)</strong>, protéines ↑↑ (>1 g/L), glucose ↓ (<2,2 mmol/L).</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Recherche BK</td>
                      <td class="border border-slate-300 p-2">PCR (GeneXpert) : rapide, sensible ; culture (Löwenstein-Jensen) : référence.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">IRM cérébrale</td>
                      <td class="border border-slate-300 p-2">Méningite basilaire, tuberculomes, infarctus multiples.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Scanner cérébral</td>
                      <td class="border border-slate-300 p-2">Épanchement, hydrocéphalie, masses tuberculeuses.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Radiographie pulmonaire</td>
                      <td class="border border-slate-300 p-2">Souvent normale ou montre un foyer résiduel.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">IDR / IGRA</td>
                      <td class="border border-slate-300 p-2">Positifs dans la majorité des cas.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Diagnostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Clinique</strong> : méningite subaiguë + altération conscience + fièvre prolongée.</li>
                  <li><strong>Biologique</strong> : LCR lymphocytaire, protéines élevées, glucose bas.</li>
                  <li><strong>Étiologique</strong> : PCR ou culture BK positive.</li>
                  <li><strong>Imagerie</strong> : lésions basales typiques.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Traitement antituberculeux</h4>
                <p class="text-sm font-semibold mb-2">Même base que la TB pulmonaire mais durée prolongée :</p>
                <table class="text-xs w-full border-collapse mb-2">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Phase</th>
                      <th class="border border-slate-300 p-2 text-left">Médicaments</th>
                      <th class="border border-slate-300 p-2 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Intensive</td>
                      <td class="border border-slate-300 p-2">2RHZE (Rifampicine + Isoniazide + Pyrazinamide + Ethambutol)</td>
                      <td class="border border-slate-300 p-2">2 mois</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Continuation</td>
                      <td class="border border-slate-300 p-2">RH (Rifampicine + Isoniazide)</td>
                      <td class="border border-slate-300 p-2">7 à 10 mois</td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-sm font-bold">🕒 Durée totale : 9 à 12 mois</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Traitement adjuvant</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Corticoïdes</strong> (prednisone 1 mg/kg/j, puis décroissance sur 4–6 semaines) → diminuent l'inflammation et l'hypertension intracrânienne.</li>
                  <li>Mannitol / dérivation ventriculaire si hydrocéphalie.</li>
                  <li>Anticonvulsivants si crises épileptiques.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Surveillance</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Clinique</strong> : fièvre, conscience, déficit neurologique.</li>
                  <li><strong>Biologique</strong> : enzymes hépatiques (toxicité).</li>
                  <li><strong>Imagerie</strong> : contrôle IRM en cas de tuberculome ou aggravation.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Pronostic</h4>
                <p class="text-sm"><strong>Grave</strong> : mortalité élevée (20–30 %) si diagnostic tardif.<br>
                <strong>Séquelles fréquentes</strong> : troubles neurologiques, cécité, surdité, hémiparésie.<br>
                Dépend du stade au diagnostic.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Santé publique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Déclaration obligatoire.</li>
                  <li>Recherche systématique d'un foyer pulmonaire ou ganglionnaire associé.</li>
                  <li>Dépistage et traitement des contacts si TB active confirmée.</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C01B02", 
            name: "Tuberculose digestive",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🩺 TUBERCULOSE DIGESTIVE (ABDOMINALE) – FICHE SYNTHÉTIQUE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔸 Définition</h4>
                <p class="text-sm">Forme extra-pulmonaire de la tuberculose touchant le tube digestif et/ou le péritoine, parfois associée à une atteinte ganglionnaire ou mésentérique.<br>
                <strong>Cause</strong> : <em>Mycobacterium tuberculosis</em>.<br>
                <strong>Transmission</strong> : ingestion de bacilles (crachat dégluti) ou dissémination hématogène.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Physiopathologie</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Atteinte secondaire à un foyer pulmonaire latent.</li>
                  <li>Colonisation de la muqueuse intestinale → ulcérations, granulomes caséeux, fibrose, voire sténoses.</li>
                  <li><strong>Localisation préférentielle</strong> : iléon terminal et caecum (zones riches en tissu lymphoïde).</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Formes anatomocliniques</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Type</th>
                      <th class="border border-slate-300 p-2 text-left">Localisation / Manifestations principales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Intestinale</td>
                      <td class="border border-slate-300 p-2">Iléon, caecum : douleurs, diarrhée ou constipation, masse abdominale, sub-occlusion.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Péritonéale</td>
                      <td class="border border-slate-300 p-2">Ascite séro-fibrineuse, fièvre, amaigrissement, sensibilité abdominale diffuse.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Ganglionnaire mésentérique</td>
                      <td class="border border-slate-300 p-2">Masse abdominale profonde, douleur chronique, fièvre modérée.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Hépatosplénique</td>
                      <td class="border border-slate-300 p-2">Rare, hépatomégalie ± fièvre.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Fièvre prolongée, sueurs nocturnes.</li>
                  <li>Douleurs abdominales chroniques.</li>
                  <li>Amaigrissement, anorexie.</li>
                  <li>Ascite (dans la forme péritonéale).</li>
                  <li>Troubles du transit (diarrhée, constipation, subocclusion).</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Examens complémentaires</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Examen</th>
                      <th class="border border-slate-300 p-2 text-left">Résultats caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Échographie / Scanner abdominaux</td>
                      <td class="border border-slate-300 p-2">Ascite, adénopathies mésentériques, épaississement iléo-caecal.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Ponction d'ascite</td>
                      <td class="border border-slate-300 p-2">Liquide exsudatif lymphocytaire, <strong>ADA élevée (>40 UI/L)</strong>.</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Endoscopie digestive</td>
                      <td class="border border-slate-300 p-2">Ulcérations, sténoses, aspect pseudo-tumoral ; biopsies pour histologie.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Histologie (biopsie)</td>
                      <td class="border border-slate-300 p-2"><strong>Granulomes épithélio-giganto-cellulaires avec nécrose caséeuse.</strong></td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Culture / PCR (GeneXpert)</td>
                      <td class="border border-slate-300 p-2">Mise en évidence du BK dans biopsies ou liquide d'ascite.</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">IDR / IGRA</td>
                      <td class="border border-slate-300 p-2">Souvent positifs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Maladie de Crohn (aspect endoscopique voisin)</li>
                  <li>Cancers digestifs</li>
                  <li>Mycoses profondes, amibiase</li>
                  <li>Péritonite carcinomateuse</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Traitement antituberculeux</h4>
                <p class="text-sm font-semibold mb-2">Même base que la forme pulmonaire :</p>
                <table class="text-xs w-full border-collapse mb-2">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Phase</th>
                      <th class="border border-slate-300 p-2 text-left">Médicaments</th>
                      <th class="border border-slate-300 p-2 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Intensive</td>
                      <td class="border border-slate-300 p-2">Rifampicine + Isoniazide + Pyrazinamide + Ethambutol (2RHZE)</td>
                      <td class="border border-slate-300 p-2">2 mois</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Continuation</td>
                      <td class="border border-slate-300 p-2">Rifampicine + Isoniazide (4RH)</td>
                      <td class="border border-slate-300 p-2">4 à 7 mois selon forme</td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-sm font-bold">🕒 Durée totale : 6 à 9 mois</p>
                <p class="text-sm mt-1">📌 Parfois prolongée jusqu'à 9–12 mois pour les formes compliquées (péritonéale, sténosante).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Traitement adjuvant</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Corticoïdes</strong> : utiles dans la forme péritonéale avec ascite abondante.</li>
                  <li><strong>Chirurgie</strong> : réservée aux sténoses, occlusions, ou abcès froids.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Surveillance</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Clinique</strong> : fièvre, transit, poids.</li>
                  <li><strong>Biologique</strong> : enzymes hépatiques, NFS.</li>
                  <li><strong>Imagerie</strong> : contrôle échographique/scanner.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Pronostic</h4>
                <p class="text-sm">• Généralement bon sous traitement complet.<br>
                • <strong>Séquelles possibles</strong> : sténoses intestinales, adhérences péritonéales.<br>
                • Évolution défavorable si diagnostic tardif ou immunodépression.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔸 Santé publique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Déclaration obligatoire.</li>
                  <li>Recherche d'un foyer pulmonaire associé.</li>
                  <li>Dépistage et traitement des contacts si TB active.</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C01B03", 
            name: "Tuberculose de l'appareil génito-urinaire",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧬 TUBERCULOSE GÉNITO-URINAIRE (TGU)</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Atteinte du tractus urinaire ou génital par <strong>Mycobacterium tuberculosis</strong>, souvent secondaire à une dissémination hématogène d'un foyer pulmonaire.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Siège</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Rein</strong> (le plus fréquent)</li>
                  <li><strong>Voies urinaires excrétrices</strong> : uretères, vessie</li>
                  <li><strong>Organes génitaux</strong> :
                    <ul class="ml-4 mt-1">
                      <li>♂ : épididyme, testicule, prostate</li>
                      <li>♀ : trompes, endomètre, ovaire, col utérin</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <p class="text-sm font-semibold mt-2">Urinaires :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Pollakiurie, dysurie, douleurs lombaires</li>
                  <li><strong>Pyurie stérile</strong> (urine avec leucocytes mais culture bactérienne négative)</li>
                  <li>Hématurie microscopique ou macroscopique</li>
                  <li>Coliques néphrétiques si sténose urétérale</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Génitales :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Homme</strong> : orchi-épididymite chronique indolore, masse scrotale, infertilité</li>
                  <li><strong>Femme</strong> : douleurs pelviennes, leucorrhées, aménorrhée secondaire, stérilité</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic</h4>
                
                <p class="text-sm font-semibold mt-2">Bacilloscopie / culture (gold standard) :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Urines du matin × 3 (examen direct et culture sur milieu de Löwenstein-Jensen)</li>
                  <li>PCR / GeneXpert MTB/RIF : diagnostic rapide</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Imagerie :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Écho / UIV / scanner abdomino-pelvien → cavernes, calcifications, sténoses urétérales</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Biopsie :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Lésion granulomateuse caséeuse (organes génitaux)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                <p class="text-sm font-semibold mb-2">💊 Même schéma que pour la tuberculose pulmonaire :</p>
                
                <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-blue-800">Phase initiale (2 mois) :</p>
                  <p class="text-sm text-blue-700">Rifampicine (R) + Isoniazide (H) + Pyrazinamide (Z) + Ethambutol (E)</p>
                  
                  <p class="text-sm font-semibold text-blue-800 mt-2">Phase de continuation (4 mois) :</p>
                  <p class="text-sm text-blue-700">Rifampicine (R) + Isoniazide (H)</p>
                </div>
                
                <p class="text-sm font-bold">➡️ Durée totale : <span class="text-primary-600">6 mois</span> (prolongée à <span class="text-primary-600">9 mois</span> si atteinte rénale sévère ou génitale étendue)</p>
                
                <p class="text-sm mt-2">🔸 <strong>Chirurgie</strong> : si complications (sténose, destruction rénale, abcès).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Risque de fibrose urétérale, hydronéphrose, insuffisance rénale chronique</li>
                  <li><strong>Stérilité masculine ou féminine</strong> si atteinte étendue</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C01B04", 
            name: "Tuberculose ganglionnaire",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧬 TUBERCULOSE GANGLIONNAIRE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm"><strong>Forme extra-pulmonaire la plus fréquente de la tuberculose.</strong><br>
                Atteinte des ganglions lymphatiques par <em>Mycobacterium tuberculosis</em> (souvent après dissémination hématogène ou lymphatique d'un foyer pulmonaire latent).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Siège habituel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Cervical (≈ 70 %)</strong> : surtout sus-claviculaire, jugulo-carotidien</li>
                  <li><strong>Autres localisations possibles</strong> : médiastinale, axillaire, inguinale, abdominale (mésentérique)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <p class="text-sm"><strong>Adénopathies chroniques, indolores, non inflammatoires au début</strong></p>
                <p class="text-sm mt-2 font-semibold">Puis :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Adhérentes, évoluant vers la fluctuation</li>
                  <li>Fistulisation cutanée avec écoulement caséeux</li>
                </ul>
                <p class="text-sm mt-2"><strong>État général</strong> : souvent conservé ou discret syndrome tuberculeux (fièvre, sueurs, amaigrissement)</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic</h4>
                
                <p class="text-sm font-semibold">Examen clinique :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Adénopathies multiples, indolores, évolutives</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Ponction / biopsie ganglionnaire :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Anatomo-pathologie</strong> : granulome épithélio-giganto-cellulaire avec nécrose caséeuse</li>
                  <li><strong>Recherche de BK</strong> : examen direct, culture, PCR / GeneXpert</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Bilan de dissémination :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Radio/Scanner thoracique → recherche d'un foyer pulmonaire associé</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                <p class="text-sm font-semibold mb-2">💊 Même que la tuberculose pulmonaire :</p>
                
                <div class="bg-green-50 border border-green-200 rounded p-3 mb-2">
                  <p class="text-sm font-bold text-green-800 text-center">2RHZE + 4RH = 6 mois</p>
                  <p class="text-xs text-green-700 text-center mt-1">(Parfois prolongé à 9 mois si atteinte lente à guérir ou multiples adénopathies)</p>
                </div>
                
                <p class="text-sm mt-2">🔸 <strong>Ponction / chirurgie</strong> : si abcès froid volumineux ou fistule persistante.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Guérison lente</strong> (mois)</li>
                  <li>Risque de fistules chroniques, fibrose, rechutes locales si mauvaise observance</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C01B05", 
            name: "Tuberculose des os et des articulations",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🦴 TUBERCULOSE OSTÉO-ARTICULAIRE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Atteinte des os et des articulations par <em>Mycobacterium tuberculosis</em>, secondaire à une dissémination hématogène d'un foyer (souvent pulmonaire latent).<br>
                Représente <strong>≈ 5 à 10 % des formes extra-pulmonaires</strong>.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Sièges fréquents</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Rachis (mal de Pott)</strong> → le plus fréquent (≈ 50 %)</li>
                  <li>Hanches, genoux, sacro-iliaques</li>
                  <li>Autres sites : poignets, coudes, chevilles</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Physiopathologie</h4>
                <p class="text-sm">Infection lente → granulome tuberculeux → nécrose caséeuse → destruction osseuse<br>
                → possible <strong>abcès froid</strong> et ankylose articulaire.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Douleurs chroniques, raideur articulaire progressive</li>
                  <li><strong>Tuméfaction froide</strong>, sans rougeur ni chaleur</li>
                  <li>Altération de l'état général (fièvre, asthénie, amaigrissement)</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Mal de Pott :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Douleurs dorsales/lombaires, cyphose, compression médullaire (déficit moteur/sensitif)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic</h4>
                
                <p class="text-sm font-semibold">Imagerie :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Radiographie</strong> : lésions ostéolytiques, pincement de l'interligne, géodes</li>
                  <li><strong>Scanner / IRM</strong> : abcès froid, atteinte médullaire, extension paravertébrale</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Biopsie osseuse ou articulaire :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Histologie</strong> : granulome caséeux typique</li>
                  <li><strong>Recherche de BK</strong> : examen direct, culture, PCR (GeneXpert)</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Bilan pulmonaire :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Radio thoracique à la recherche d'un foyer associé</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-orange-50 border border-orange-200 rounded p-3 mb-2">
                  <p class="text-sm font-bold text-orange-800 mb-2">💊 Antituberculeux 9 à 12 mois :</p>
                  <ul class="text-sm text-orange-700 list-disc list-inside ml-2">
                    <li><strong>Phase initiale (2 mois)</strong> : RHZE</li>
                    <li><strong>Phase de continuation (7 à 10 mois)</strong> : RH</li>
                  </ul>
                </div>
                
                <p class="text-sm">🔸 <strong>Immobilisation</strong> du segment atteint</p>
                <p class="text-sm">🔸 <strong>Chirurgie</strong> : si abcès froid volumineux, compression médullaire, déformation, ou séquelles graves</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Guérison lente</strong></li>
                  <li>Risque de déformations, ankylose, paraplégie (forme rachidienne non traitée)</li>
                </ul>
              </div>
            </div>`
          },
          { code: "C01B06", name: "Autres Tuberculoses" },
        ],
      },
    ],
  },
  {
    code: "C02",
    name: "Les psycho-névroses graves",
    children: [
      {
        code: "C02A",
        name: "Psychoses graves",
        children: [
          { 
            code: "C02A01", 
            name: "Schizophrénie paranoïde",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 SCHIZOPHRÉNIE PARANOÏDE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Trouble psychotique chronique appartenant au spectre de la schizophrénie, dominé par les <strong>idées délirantes systématisées</strong> (persécution, grandeur, influence...) et les <strong>hallucinations</strong>, avec une préservation relative de la sphère affective et cognitive au début.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Généralement entre <strong>20 et 35 ans</strong></li>
                  <li>Début plus tardif que les autres formes de schizophrénie</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <p class="text-sm font-semibold mt-2">1. Syndrome délirant</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Délire paranoïde, non systématisé, souvent hallucinatoire</li>
                  <li><strong>Thèmes</strong> : persécution, influence, grandeur, mysticisme, jalousie</li>
                  <li><strong>Mécanismes</strong> : hallucinations auditives, intuition, interprétation, imagination</li>
                  <li>Conviction inébranlable, sans critique du délire</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">2. Hallucinations</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Surtout <strong>auditives</strong> (voix commentant, dialoguant, insultant le patient)</li>
                  <li>Parfois visuelles ou cénesthésiques</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">3. Dissociation psychique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Altération du cours de la pensée (coq-à-l'âne, bizarreries)</li>
                  <li>Ambivalence, autisme, incohérence légère</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">4. Évolution</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Fluctuante, par poussées délirantes</li>
                  <li>Altération progressive du fonctionnement social, affectif et professionnel</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Trouble délirant chronique (délire mieux organisé, sans dissociation)</li>
                  <li>Trouble bipolaire (délire congruent à l'humeur)</li>
                  <li>Intoxication ou trouble organique cérébral</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-purple-50 border border-purple-200 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-purple-800 mb-2">💊 Antipsychotiques (neuroleptiques) :</p>
                  <ul class="text-sm text-purple-700 list-disc list-inside ml-2">
                    <li><strong>Atypique en première intention</strong> : rispéridone, olanzapine, aripiprazole, etc.</li>
                    <li><strong>Classique si mauvaise réponse</strong> : halopéridol, fluphénazine…</li>
                  </ul>
                  <p class="text-xs text-purple-600 mt-1">➡️ Objectif : réduire les symptômes positifs (délire, hallucinations)</p>
                </div>
                
                <p class="text-sm font-semibold mt-2">🧩 Psychothérapie :</p>
                <p class="text-sm ml-2">Thérapie de soutien, remédiation cognitive, psychoéducation</p>
                
                <p class="text-sm font-semibold mt-2">👥 Réhabilitation psychosociale :</p>
                <p class="text-sm ml-2">Réinsertion sociale et professionnelle, accompagnement familial</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Chronique, avec rechutes possibles</li>
                  <li><strong>Meilleur pronostic</strong> que les formes désorganisées ou hébéphréniques</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">Facteurs de bon pronostic :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Début aigu, bon soutien familial, bonne observance thérapeutique</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C02A02", 
            name: "Schizophrénie hébéphrénique",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 SCHIZOPHRÉNIE HÉBÉPHRÉNIQUE (ou DÉSORGANISÉE)</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Forme de schizophrénie caractérisée par une <strong>désorganisation profonde de la pensée, du langage et du comportement</strong>, avec affect inapproprié et immaturité émotionnelle.<br>
                C'est la <strong>forme la plus déficitaire et la plus sévère</strong> de la schizophrénie.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Adolescence – début de l'âge adulte (15–25 ans)</strong></li>
                  <li>Début insidieux, progressif</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <p class="text-sm font-semibold mt-2">1. Dissociation psychique majeure</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Incohérence du discours</strong> : langage désorganisé, coq-à-l'âne, néologismes</li>
                  <li>Pensée illogique, perte du fil, réponses absurdes</li>
                  <li><strong>Comportement désorganisé</strong> : puéril, inadapté, maniérisme</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">2. Affectivité perturbée</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Rires immotivés, mimique inappropriée</li>
                  <li><strong>Affect plat ou inadéquat</strong> (discordance entre émotion et situation)</li>
                  <li>Ambivalence affective et relationnelle</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">3. Retrait social et apathie</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Isolement, négligence corporelle, désintérêt total pour l'environnement</li>
                  <li>Comportements parfois bizarres ou infantiles</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">4. Délire et hallucinations</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Peu systématisés, peu organisés</li>
                  <li>Moins riches que dans la forme paranoïde</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Progressive et déficitaire</strong></li>
                  <li>Installation rapide d'une désorganisation durable de la personnalité</li>
                  <li>Tendance à l'évolution vers la chronicité et l'<strong>apragmatisme</strong> (inertie psychique)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Trouble bipolaire (forme maniaque atypique)</li>
                  <li>Trouble du spectre autistique (début précoce, langage particulier)</li>
                  <li>Cause organique (encéphalite, épilepsie temporale…)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-red-50 border border-red-200 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-red-800 mb-2">💊 Antipsychotiques :</p>
                  <ul class="text-sm text-red-700 list-disc list-inside ml-2">
                    <li><strong>Atypiques privilégiés</strong> (olanzapine, rispéridone, clozapine si résistance)</li>
                    <li>Objectif : stabiliser la pensée et réduire la désorganisation</li>
                  </ul>
                </div>
                
                <p class="text-sm font-semibold mt-2">🧩 Thérapies non médicamenteuses :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Rééducation cognitive, ergothérapie, psychoéducation</li>
                  <li>Encadrement structurant, vie quotidienne assistée</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">👥 Soutien familial et social essentiel</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Pronostic</h4>
                <div class="bg-yellow-50 border border-yellow-300 rounded p-2">
                  <p class="text-sm font-bold text-yellow-900">⚠️ Défavorable : forme la plus désorganisée et déficitaire</p>
                  <ul class="text-sm text-yellow-800 list-disc list-inside ml-2 mt-1">
                    <li>Installation rapide de détérioration intellectuelle et sociale</li>
                    <li>Peu de rémissions durables</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
          { 
            code: "C02A03", 
            name: "Schizophrénie catatonique",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 SCHIZOPHRÉNIE CATATONIQUE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Forme de schizophrénie dominée par des <strong>troubles psychomoteurs extrêmes</strong>, alternant inhibition, négativisme, stupor, ou au contraire excitation motrice.<br>
                L'activité mentale reste profondément perturbée (dissociation, délire, hallucinations).</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Généralement entre <strong>15 et 35 ans</strong></li>
                  <li>Début parfois aigu sur fond de personnalité schizophrénique</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <p class="text-sm font-semibold mt-2">1. Troubles psychomoteurs caractéristiques</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Stupeur catatonique</strong> : immobilité, mutisme, refus de s'alimenter</li>
                  <li><strong>Flexibilité cireuse</strong> : maintien prolongé de postures imposées</li>
                  <li><strong>Négativisme</strong> : résistance passive ou active à toute sollicitation</li>
                  <li>Mutisme complet</li>
                  <li>Postures bizarres ou stéréotypies motrices</li>
                  <li><strong>Écholalie</strong> (répète les mots) / <strong>Échopraxie</strong> (mime les gestes)</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">2. Phase d'agitation catatonique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Excitation motrice intense, sans but, souvent incohérente</li>
                  <li>Risque d'agressivité ou d'épuisement physique</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">3. Troubles psychiques associés</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Délire, hallucinations, dissociation du cours de la pensée</li>
                  <li>Affect plat ou inadéquat</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <p class="text-sm font-semibold">Catatonie secondaire :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Troubles de l'humeur (dépression ou manie catatonique)</li>
                  <li>Encéphalites, troubles métaboliques, épilepsie</li>
                  <li>Syndrome malin des neuroleptiques</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-indigo-50 border border-indigo-200 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-indigo-800 mb-2">💊 Phase aiguë :</p>
                  <ul class="text-sm text-indigo-700 list-disc list-inside ml-2">
                    <li><strong>Benzodiazépines IV</strong> (lorazépam, diazépam) → test diagnostique et thérapeutique</li>
                    <li>Si résistance → <strong>Électroconvulsivothérapie (ECT)</strong> très efficace</li>
                    <li>Ensuite : <strong>Antipsychotiques atypiques</strong> (aripiprazole, olanzapine…)</li>
                  </ul>
                  <p class="text-sm text-indigo-800 mt-2">⚠️ <strong>Surveillance nutritionnelle et hydrique</strong> (refus d'alimentation fréquent)</p>
                </div>
                
                <p class="text-sm mt-2">🧩 Rééducation psychomotrice + prise en charge psychiatrique à long terme</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Peut être aiguë réversible</strong> (bonne réponse aux benzodiazépines/ECT)</li>
                  <li>Ou chronique : installation de rigidité psychique, retrait autistique, négativisme durable</li>
                  <li><strong>Pronostic meilleur</strong> si traitement rapide et observance thérapeutique</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C02A04", 
            name: "Schizophrénie simple",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 SCHIZOPHRÉNIE SIMPLE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Forme insidieuse et déficitaire de la schizophrénie, <strong>sans délire ni hallucinations marquées</strong>, dominée par une désintégration progressive de la personnalité, un retrait social et une perte d'intérêt.<br>
                C'est la <strong>forme la plus pauvre et la plus silencieuse</strong> de la maladie.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Adolescence – jeune adulte (<strong>15–25 ans</strong>)</li>
                  <li><strong>Début lent et progressif</strong>, souvent inaperçu</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <p class="text-sm font-semibold mt-2">1. Évolution insidieuse</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Altération progressive du rendement scolaire ou professionnel</li>
                  <li>Isolement, désinvestissement affectif et social</li>
                  <li><strong>Apathie, indifférence, négligence corporelle</strong></li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">2. Syndrome dissociatif discret</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Pensée pauvre, langage vide, incohérences légères</li>
                  <li>Ambivalence, discordance affective</li>
                  <li><strong>Retrait autistique</strong> (monde intérieur, absence de contact)</li>
                </ul>
                
                <p class="text-sm font-semibold mt-2">3. Pas de délire ni d'hallucinations</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Mais présence possible de bizarreries de comportement</li>
                  <li>Affects inappropriés, pensée désorganisée à bas bruit</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Diagnostic d'élimination</strong> : exclure autres formes de schizophrénie, dépression chronique, trouble de la personnalité schizotypique</li>
                  <li>Basé sur la <strong>détérioration psychique lente et continue</strong> sans épisode psychotique manifeste</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-gray-100 border border-gray-300 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-gray-800 mb-2">💊 Antipsychotiques atypiques (olanzapine, rispéridone, aripiprazole)</p>
                  <p class="text-xs text-gray-600">➡️ Efficacité souvent <strong>limitée</strong> (peu de symptômes positifs à traiter)</p>
                </div>
                
                <p class="text-sm mt-2">🧩 <strong>Psychothérapie de soutien</strong>, remédiation cognitive, ergothérapie, encadrement socio-professionnel</p>
                <p class="text-sm mt-2">👥 Soutien familial et surveillance à long terme</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 border border-slate-300 rounded p-2">
                  <p class="text-sm font-bold text-slate-800">Lente, chronique, déficitaire</p>
                  <ul class="text-sm text-slate-700 list-disc list-inside ml-2 mt-1">
                    <li>Risque élevé de désinsertion sociale, inertie, pauvreté affective et cognitive</li>
                    <li><strong>Pronostic défavorable</strong> (peu de rémissions)</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
          { 
            code: "C02A05", 
            name: "Troubles délirants persistants",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 TROUBLES DÉLIRANTS PERSISTANTS (TDP)</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">Trouble psychotique caractérisé par un <strong>délire chronique (>3 mois)</strong>, non bizarres, cohérents et systématisés, <strong>sans altération majeure du fonctionnement global</strong> contrairement à la schizophrénie.<br><br>
                Les hallucinations sont absentes ou minimes, le comportement reste globalement adapté.</p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Habituellement <strong>30–40 ans</strong></li>
                  <li>Début progressif, souvent insidieux</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Formes cliniques (DSM-5 / CIM-10)</h4>
                <table class="text-xs w-full border-collapse">
                  <thead>
                    <tr class="bg-primary-100">
                      <th class="border border-slate-300 p-2 text-left">Type</th>
                      <th class="border border-slate-300 p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Persécution</td>
                      <td class="border border-slate-300 p-2">Sentiment d'être surveillé, harcelé, trompé, victime de complots</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Érotomaniaque</td>
                      <td class="border border-slate-300 p-2">Croyance qu'une personne (souvent inaccessible) est amoureuse du patient</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Mégalomaniaque / de grandeur</td>
                      <td class="border border-slate-300 p-2">Surestimation de ses capacités, pouvoirs, statut</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Jalouse</td>
                      <td class="border border-slate-300 p-2">Doute pathologique sur la fidélité du partenaire</td>
                    </tr>
                    <tr>
                      <td class="border border-slate-300 p-2 font-semibold">Somatique</td>
                      <td class="border border-slate-300 p-2">Conviction erronée concernant son corps (maladie, odeur, infestation)</td>
                    </tr>
                    <tr class="bg-slate-50">
                      <td class="border border-slate-300 p-2 font-semibold">Mixte</td>
                      <td class="border border-slate-300 p-2">Combinaison de plusieurs thèmes délirants</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Délire systématisé</strong>, souvent logique et cohérent</li>
                  <li>Comportement en apparence normal</li>
                  <li><strong>Fonctionnement social préservé</strong> (sauf actes liés au délire)</li>
                  <li>Humeur souvent normale ou légèrement irritabilité</li>
                  <li>Pas de désorganisation majeure du langage ou du comportement</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Schizophrénie paranoïde (présence de désorganisation, hallucinations)</li>
                  <li>Trouble bipolaire avec symptômes psychotiques</li>
                  <li>Trouble obsessionnel-compulsif avec idées délirantes</li>
                  <li>Troubles liés à une substance ou à une affection organique</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-teal-50 border border-teal-200 rounded p-3 mb-2">
                  <p class="text-sm font-semibold text-teal-800 mb-2">💊 Antipsychotiques (Risperidone, Olanzapine, Aripiprazole)</p>
                  <ul class="text-sm text-teal-700 list-disc list-inside ml-2">
                    <li>Objectif : réduire conviction délirante, anxiété et comportements à risque</li>
                    <li>Durée prolongée souvent nécessaire</li>
                  </ul>
                </div>
                
                <p class="text-sm font-semibold mt-2">🧩 Psychothérapie :</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Thérapie cognitive et comportementale adaptée au délire</li>
                  <li>Soutien familial, encadrement des comportements à risque</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Chronique mais stable</strong></li>
                  <li><strong>Facteurs de mauvais pronostic</strong> : isolement social, croyances rigides, absence de soutien familial</li>
                  <li><strong>Risque</strong> : passages à l'acte liés au thème délirant (jalousie, persécution)</li>
                </ul>
              </div>
            </div>`
          },
          { 
            code: "C02A06", 
            name: "Psychose hallucinatoire chronique",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 PSYCHOSE HALLUCINATOIRE CHRONIQUE (PHC)</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">
                  Trouble psychotique chronique caractérisé par <strong>hallucinations auditives persistantes</strong>, souvent commentant ou discutant avec le patient, sans désorganisation majeure de la pensée ni délire systématisé.
                </p>
                <ul class="text-sm list-disc list-inside ml-2 mt-1">
                  <li>Le fonctionnement social et intellectuel est <strong>préservé</strong> en dehors de l'impact des hallucinations.</li>
                  <li><strong>Pas de schizophrénie</strong> : absence de délire systématisé et de désorganisation globale.</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <p class="text-sm">
                  <strong>Habituellement après 40 ans</strong><br>
                  Début progressif
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Hallucinations auditives</strong> : voix familières ou inconnues, commentant ou insultant</li>
                  <li><strong>Hallucinations visuelles</strong> moins fréquentes</li>
                  <li><strong>Délire secondaire</strong> et parfois transitoire, mais non systématisé</li>
                  <li><strong>Fonctionnement social relativement conservé</strong></li>
                  <li><strong>Humeur</strong> souvent stable, parfois anxiété liée aux hallucinations</li>
                  <li><strong>Pas de dissociation</strong> de la pensée</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Schizophrénie paranoïde</strong> (délire systématisé + hallucinations)</li>
                  <li><strong>Trouble délirant persistant</strong> (délire sans hallucinations majeures)</li>
                  <li><strong>Psychose post-traumatique</strong> ou liée à une affection neurologique</li>
                  <li><strong>Hallucinations liées à substances</strong> ou troubles organiques</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-cyan-50 border-l-4 border-cyan-500 p-2 mb-2">
                  <p class="text-sm font-semibold">💊 Antipsychotiques :</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Atypiques</strong> (rispéridone, olanzapine, aripiprazole) → ciblent hallucinations et anxiété</li>
                    <li>Traitement souvent <strong>chronique</strong>, dose ajustée selon tolérance</li>
                  </ul>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-500 p-2">
                  <p class="text-sm font-semibold">🧩 Thérapie de soutien et psychoéducation :</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li>Éducation sur hallucinations, <strong>techniques de coping</strong></li>
                    <li><strong>Soutien familial</strong>, prévention de l'isolement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 p-2 rounded">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Chronique</strong>, avec fluctuations d'intensité</li>
                    <li><strong>Fonction sociale souvent préservée</strong></li>
                    <li><strong>Facteurs de mauvais pronostic</strong> : début précoce, hallucinations multiples, isolement social</li>
                    <li><strong>Risque faible</strong> de passage à l'acte, sauf si hallucinations commandantes</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
        ],
      },
      {
        code: "C02B",
        name: "Troubles de l'humeur persistants",
        children: [
          { 
            code: "C02B01", 
            name: "Trouble affectif bipolaire",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 TROUBLE AFFECTIF BIPOLAIRE (TAB)</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">
                  Trouble psychiatrique caractérisé par <strong>alternance d'épisodes dépressifs et maniaques/hypomaniaques</strong>, parfois séparés par des périodes euthymiques.
                </p>
                <ul class="text-sm list-disc list-inside ml-2 mt-1">
                  <li><strong>Type I</strong> : épisodes maniaques + dépressifs</li>
                  <li><strong>Type II</strong> : épisodes hypomaniaques + dépressifs, jamais maniaques</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <p class="text-sm">
                  <strong>Entre 15 et 30 ans</strong><br>
                  Début souvent insidieux, premier épisode le plus souvent <strong>dépressif</strong>
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2 mb-2">
                  <p class="text-sm font-semibold">1. Épisode maniaque</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Humeur euphorique</strong>, expansive ou irritable</li>
                    <li><strong>Hyperactivité</strong>, agitation psychomotrice</li>
                    <li><strong>Idées de grandeur</strong>, diminution du sommeil, logorrhée</li>
                    <li><strong>Impulsivité</strong>, comportements à risque</li>
                  </ul>
                </div>

                <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
                  <p class="text-sm font-semibold">2. Épisode hypomaniaque</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li>Symptômes similaires à la manie mais <strong>moins sévères</strong></li>
                    <li><strong>Pas d'altération majeure</strong> du fonctionnement social ou hospitalisation</li>
                  </ul>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                  <p class="text-sm font-semibold">3. Épisode dépressif</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Humeur dépressive</strong>, tristesse, pleurs</li>
                    <li><strong>Anhédonie</strong>, fatigue, ralentissement psychomoteur</li>
                    <li><strong>Idées de culpabilité</strong>, parfois idées suicidaires</li>
                  </ul>
                </div>

                <div class="bg-red-50 border-l-4 border-red-500 p-2">
                  <p class="text-sm font-semibold">4. Épisodes mixtes</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Humeur dépressive + agitation</strong> ou irritabilité</li>
                    <li><strong>⚠️ Risque élevé de suicide</strong></li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Clinique</strong> : basé sur l'histoire des épisodes</li>
                  <li><strong>Échelle</strong> : Mood Disorder Questionnaire (MDQ)</li>
                  <li><strong>Exclusion</strong> de causes organiques, substances, médicaments</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                  <p class="text-sm font-semibold">💊 Médicamenteux</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Stabilisateurs de l'humeur</strong> : lithium, valproate, lamotrigine</li>
                    <li><strong>Antipsychotiques atypiques</strong> : olanzapine, quetiapine, aripiprazole</li>
                    <li><strong>Antidépresseurs</strong> : avec précaution, toujours associés à un stabilisateur pour éviter le switch maniaque</li>
                  </ul>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-2">
                  <p class="text-sm font-semibold">🧩 Non médicamenteux</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Psychoéducation</strong>, suivi régulier</li>
                    <li><strong>Thérapie cognitive et comportementale</strong></li>
                    <li><strong>Soutien familial</strong>, hygiène de vie stricte (sommeil, activité, alimentation)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 p-2 rounded">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Chronique</strong>, avec épisodes récurrents</li>
                    <li><strong>Facteurs de mauvais pronostic</strong> : début précoce, nombreux épisodes, comorbidités psychiatriques</li>
                    <li><strong>⚠️ Risque suicidaire élevé</strong> (≈15 % lifetime)</li>
                    <li><strong>Bonne observance et suivi</strong> → réduction des rechutes</li>
                  </ul>
                </div>
              </div>
            </div>`
          }
        ],
      },
      {
        code: "C02C",
        name: "Névroses graves",
        children: [
          { 
            code: "C02C01", 
            name: "Névrose phobique grave",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 NÉVROSE PHOBIQUE GRAVE</h3>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">
                  Trouble anxieux caractérisé par une <strong>peur intense, irrationnelle et persistante</strong> déclenchée par un objet, une situation ou une activité spécifique, avec <strong>évitement marqué</strong>.
                </p>
                <p class="text-sm mt-1">
                  La peur est <strong>exagérée par rapport au danger réel</strong> et provoque une détresse fonctionnelle significative.
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <p class="text-sm">
                  <strong>Enfance ou adolescence</strong>, souvent avant 20 ans<br>
                  Début souvent insidieux, <strong>évolution chronique</strong> sans traitement
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Crises d'angoisse</strong> (attaques de panique) déclenchées par la situation phobogène</li>
                  <li><strong>Évitement systématique</strong> de la situation ou de l'objet</li>
                  <li><strong>Symptômes somatiques</strong> : tachycardie, sueurs, tremblements, vertiges, sensation d'étouffement</li>
                  <li><strong>Altération sociale et professionnelle</strong> : difficultés scolaires, isolement, incapacité à voyager ou à travailler</li>
                  <li><strong>Insight</strong> : patient reconnaît la disproportion de sa peur mais ne peut la contrôler</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Types courants</h4>
                <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                  <tbody>
                    <tr class="border border-gray-300">
                      <td class="p-2 font-semibold bg-gray-100 border border-gray-300">Phobie spécifique</td>
                      <td class="p-2 border border-gray-300">Animaux, hauteur, sang, injections, transport</td>
                    </tr>
                    <tr class="border border-gray-300">
                      <td class="p-2 font-semibold bg-gray-100 border border-gray-300">Phobie sociale</td>
                      <td class="p-2 border border-gray-300">Peur intense d'être observé ou jugé dans des situations sociales</td>
                    </tr>
                    <tr class="border border-gray-300">
                      <td class="p-2 font-semibold bg-gray-100 border border-gray-300">Agoraphobie</td>
                      <td class="p-2 border border-gray-300">Peur des lieux publics ou situations difficiles à fuir</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Trouble panique</strong></li>
                  <li><strong>Trouble obsessionnel-compulsif (TOC)</strong> avec rituels phobiques</li>
                  <li><strong>Schizophrénie ou psychose</strong> (si peur délirante)</li>
                  <li><strong>Causes organiques</strong> (cardiopathie, épilepsie, hyperthyroïdie)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                  <p class="text-sm font-semibold">💊 Médicamenteux</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Antidépresseurs ISRS</strong> (fluoxetine, sertraline, paroxetine)</li>
                    <li><strong>Benzodiazépines</strong> à court terme (anxiété aiguë)</li>
                    <li><strong>Autres</strong> : bêta-bloquants (performance sociale, palpitations)</li>
                  </ul>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-2">
                  <p class="text-sm font-semibold">🧩 Psychothérapie</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Thérapie comportementale et cognitive (TCC)</strong> : exposition graduelle, désensibilisation, restructuration cognitive</li>
                    <li><strong>Relaxation</strong>, techniques respiratoires</li>
                    <li><strong>Accompagnement familial</strong> et psychoéducation</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 p-2 rounded">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Chronique</strong> si non traitée</li>
                    <li><strong>Amélioration fréquente</strong> avec TCC + traitement pharmacologique</li>
                    <li><strong>Risque de comorbidités</strong> anxieuses ou dépressives si non prise en charge</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
          { 
            code: "C02C02", 
            name: "Névrose hystérique grave",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 NÉVROSE HYSTÉRIQUE GRAVE</h3>
              <p class="text-xs italic text-gray-600">(Trouble de conversion / trouble somatoforme hystérique)</p>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">
                  Trouble psychiatrique caractérisé par <strong>symptômes neurologiques ou somatiques sans cause organique identifiée</strong>, souvent en lien avec des conflits psychiques inconscients.
                </p>
                <ul class="text-sm list-disc list-inside ml-2 mt-1">
                  <li>Anciennement appelée <strong>hystérie de conversion</strong></li>
                  <li>La gravité réside dans <strong>l'incapacité fonctionnelle majeure</strong> et la présentation dramatique</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <p class="text-sm">
                  <strong>Adolescence ou jeune adulte</strong> (souvent femme)<br>
                  Début souvent progressif ou suite à un <strong>stress majeur</strong>
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Symptômes moteurs</strong> : paralysies, tremblements, mouvements anormaux, contractures</li>
                  <li><strong>Symptômes sensitifs</strong> : anesthésies, paresthésies, cécité, surdité</li>
                  <li><strong>Crises pseudo-épileptiques</strong> (non épileptiques)</li>
                  <li><strong>Altération fonctionnelle grave</strong> : incapacité à marcher, utiliser un membre, parler</li>
                  <li><strong>Caractère dramatique et suggestible</strong> : exacerbation devant témoin, variabilité</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Particularités</h4>
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Absence de correspondance anatomique</strong> avec les symptômes</li>
                    <li><strong>Pas de lésions organiques</strong> démontrables</li>
                    <li><strong>Hystéro-équivalence</strong> : manifestation symbolique du conflit psychique</li>
                    <li><strong>Comorbidité fréquente</strong> : troubles anxieux, dépression, personnalité histrionique</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Maladies neurologiques réelles</strong> : AVC, sclérose en plaques, épilepsie</li>
                  <li><strong>Trouble somatoforme chronique</strong></li>
                  <li><strong>Simulation / malingering</strong> (différence : motivation consciente)</li>
                  <li><strong>Trouble dissociatif sévère</strong></li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                  <p class="text-sm font-semibold">🧩 Psychothérapie</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Thérapie analytique ou cognitive-comportementale</strong></li>
                    <li>Approche centrée sur la <strong>reconnaissance du conflit psychique</strong></li>
                    <li><strong>Rééducation fonctionnelle progressive</strong> (physiothérapie si paralysie)</li>
                  </ul>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                  <p class="text-sm font-semibold">💊 Pharmacologie</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li>Traitement <strong>symptomatique</strong> de l'anxiété ou dépression si comorbidité (ISRS, anxiolytiques)</li>
                  </ul>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-2">
                  <p class="text-sm font-semibold">👥 Accompagnement familial</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li>Soutien, compréhension</li>
                    <li><strong>Limitation des renforcements secondaires</strong></li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 p-2 rounded">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Variable</strong> : récupération complète possible, surtout si <strong>intervention précoce</strong></li>
                    <li><strong>Risque de chronification</strong> en cas de renforcement secondaire ou stress persistant</li>
                    <li><strong>Bon pronostic</strong> : insight progressif, soutien social et traitement psychothérapeutique</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
          { 
            code: "C02C03", 
            name: "Névrose obsessionnelle grave",
            tooltip: `<div class="space-y-3">
              <h3 class="font-bold text-lg text-primary-700">🧠 NÉVROSE OBSESSIONNELLE GRAVE</h3>
              <p class="text-xs italic text-gray-600">(Trouble obsessionnel-compulsif sévère)</p>
              
              <div>
                <h4 class="font-semibold text-primary-600">🔹 Définition</h4>
                <p class="text-sm">
                  Trouble anxieux caractérisé par <strong>obsessions</strong> (idées, images ou impulsions récurrentes et intrusives) et <strong>compulsions</strong> (rituels ou comportements destinés à neutraliser l'angoisse).
                </p>
                <p class="text-sm mt-1">
                  La forme grave entraîne une <strong>détérioration majeure</strong> du fonctionnement social, professionnel et familial.
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Âge de début</h4>
                <p class="text-sm">
                  <strong>Adolescence ou jeune adulte</strong> (souvent entre 15 et 25 ans)<br>
                  Début souvent progressif
                </p>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Clinique</h4>
                
                <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
                  <p class="text-sm font-semibold">1. Obsessions</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Idées répétitives, intrusives, incontrôlables</strong></li>
                    <li><strong>Thèmes fréquents</strong> : contamination, agressivité, symétrie, doute, religion, sexualité</li>
                    <li>Provoquent <strong>anxiété intense</strong></li>
                  </ul>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                  <p class="text-sm font-semibold">2. Compulsions</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Actes répétitifs</strong> destinés à neutraliser l'angoisse : lavage, vérification, comptage, rangement, prières</li>
                    <li><strong>Rituels chronophages</strong> : plusieurs heures par jour</li>
                  </ul>
                </div>

                <div class="bg-red-50 border-l-4 border-red-500 p-2">
                  <p class="text-sm font-semibold">3. Impact fonctionnel</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Retrait social</strong>, incapacité à travailler ou étudier</li>
                    <li><strong>Fatigue physique et psychique</strong></li>
                    <li>Sentiment de <strong>contrôle partiel</strong> sur les obsessions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Diagnostic différentiel</h4>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Trouble anxieux généralisé</strong></li>
                  <li><strong>Troubles psychotiques</strong> (si idées délirantes vs obsessions)</li>
                  <li><strong>Trouble de personnalité obsessionnelle</strong> (différence : moins de détresse et pas de compulsions)</li>
                  <li><strong>TOC secondaire</strong> à cause neurologique (lésions fronto-striatales)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Traitement</h4>
                
                <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                  <p class="text-sm font-semibold">💊 Pharmacologique</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>ISRS à doses élevées</strong> : fluoxetine, sertraline, paroxetine</li>
                    <li><strong>Clomipramine</strong> (tricyclique) si résistance aux ISRS</li>
                    <li>Augmentation progressive selon tolérance et réponse</li>
                  </ul>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                  <p class="text-sm font-semibold">🧩 Psychothérapie</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Thérapie cognitive et comportementale (TCC)</strong> : exposition avec prévention de la réponse (ERP)</li>
                    <li>Techniques de <strong>relaxation</strong> et gestion du stress</li>
                  </ul>
                </div>

                <div class="bg-teal-50 border-l-4 border-teal-500 p-2">
                  <p class="text-sm font-semibold">👥 Accompagnement familial</p>
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li>Information sur le trouble, soutien</li>
                    <li><strong>Éviter le renforcement des compulsions</strong></li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-primary-600">🔹 Évolution / Pronostic</h4>
                <div class="bg-slate-100 p-2 rounded">
                  <ul class="text-sm list-disc list-inside ml-2">
                    <li><strong>Chronique</strong>, fluctuations selon stress et traitement</li>
                    <li>Avec <strong>TCC + traitement pharmacologique</strong>, amélioration significative fréquente</li>
                    <li><strong>⚠️ Risque de handicap fonctionnel grave</strong> si non traité</li>
                  </ul>
                </div>
              </div>
            </div>`
          },
        ],
      },
    ],
  },
  {
    code: "C03",
    name: "Les maladies cancéreuses",
    children: [
        { code: "C03A", name: "Cancer du système nerveux", children: [{ code: "C03A01", name: "Cancer des méninges" }, { code: "C03A02", name: "Cancer de l'encéphale" }, { code: "C03A03", name: "Cancer de la moelle épinière, des nerfs crâniens et d" }] },
        { code: "C03B", name: "Cancer de la sphère ORL", children: [{ code: "C03B01", name: "Cancer de l'oreille" }, { code: "C03B02", name: "Cancer du nez" }, { code: "C03B03", name: "Cancer du larynx" }, { code: "C03B04", name: "Cancer du cavum" }, { code: "C03B05", name: "Cancer de la glande parotide" }, { code: "C03B06", name: "Cancer des glandes salivaires" }, { code: "C03B07", name: "Cancer de l'oropharynx" }, { code: "C03B08", name: "Cancer du sinus" }, { code: "C03B09", name: "Cancer de l'hypopharynx" }] },
        { code: "C03C", name: "Cancer de l'œil", children: [{ code: "C03C01", name: "Rétinoblastome" }, { code: "C03C02", name: "Mélanome" }, { code: "C03C03", name: "Autres cancers de l'œil" }] },
        { code: "C03D", name: "Cancers digestifs", children: [{ code: "C03D01", name: "Cancer de la cavité buccale et des lèvres" }, { code: "C03D02", name: "Cancer de l'œsophage" }, { code: "C03D03", name: "Cancer de l'estomac" }, { code: "C03D04", name: "Cancer du foie" }, { code: "C03D05", name: "Cancer de la vésicule biliaire" }, { code: "C03D06", name: "Cancer de l'ampoule de vater" }, { code: "C03D07", name: "Cancer Voies biliaires" }, { code: "C03D08", name: "Cancer du pancréas" }, { code: "C03D09", name: "Cancer de l'intestin grêle" }, { code: "C03D10", name: "Cancer colo-rectal" }, { code: "C03D11", name: "Cancer de l'anus" }, { code: "C03D12", name: "Autres cancers digestifs" }] },
        { code: "C03E", name: "Cancers broncho-pulmonaires", children: [{ code: "C03E01", name: "Cancer de la trachée" }, { code: "C03E02", name: "Cancer du poumon" }, { code: "C03E03", name: "Cancer de la plèvre" }] },
        { code: "C03F", name: "Cancers thoraco-médiastinaux", children: [{ code: "C03F01", name: "Cancer du médiastin" }, { code: "C03F02", name: "Cancer du cœur" }] },
        { code: "C03G", name: "Cancers de l'appareil urinaire", children: [{ code: "C03G01", name: "Cancer du rein" }, { code: "C03G02", name: "Cancer de l'uretère" }, { code: "C03G03", name: "Cancer de la vessie" }] },
        { code: "C03H", name: "Cancer de l'appareil génital féminin", children: [{ code: "C03H01", name: "Cancer de la vulve" }, { code: "C03H02", name: "Cancer du vagin" }, { code: "C03H03", name: "Cancer du col de l'utérus" }, { code: "C03H04", name: "Cancer du corps de l'utérus" }, { code: "C03H05", name: "Cancer de l'ovaire" }, { code: "C03H06", name: "Autres Cancers de l'appareil génital féminin" }] },
        { code: "C03I", name: "Cancer de l'appareil génital masculin", children: [{ code: "C03I01", name: "Cancer de la verge" }, { code: "C03I02", name: "Cancer de la prostate" }, { code: "C03I03", name: "Cancer du testicule" }, { code: "C03I04", name: "Autres Cancers de l'appareil génital masculin" }] },
        { code: "C03J", name: "Cancer du sein", children: [{ code: "C03J01", name: "Carcinome canalaire in situ (CCIS)" }, { code: "C03J02", name: "Adénocarcinome canalaire infiltrant" }, { code: "C03J03", name: "Adénocarcinome lobulaire infiltrant" }, { code: "C03J04", name: "Carcinome médullaire" }, { code: "C03J05", name: "Carcinome mucineux ou colloïde muqueux" }, { code: "C03J06", name: "Adénocarcinome tubuleux" }, { code: "C03J07", name: "Carcinome adénoïde kystique" }, { code: "C03J08", name: "Carcinome apocrine" }, { code: "C03J09", name: "Maladie de Paget du mamelon" }, { code: "C03J10", name: "Cancer du sein chez l'homme" }] },
        { code: "C03K", name: "Cancers du système lymphatique", children: [{ code: "C03K01", name: "Cancer de l'amygdale" }, { code: "C03K02", name: "Cancer de la rate" }, { code: "C03K03", name: "Cancer des ganglions lymphatiques" }, { code: "C03K04", name: "Autres cancers du système lymphatique" }] },
        { code: "C03L", name: "Cancers du sang", children: [{ code: "C03L01", name: "Macroglobulinémie de Waldenström" }, { code: "C03L02", name: "Leucémie lymphoïde aiguë [LLA]" }, { code: "C03L03", name: "Leucémie lymphoïde chronique [LLC]" }, { code: "C03L04", name: "Leucémie myéloblastique aiguë [LMA]" }, { code: "C03L05", name: "Leucémie myéloïde chronique [LMC]" }, { code: "C03L06", name: "Lymphome Hodgkinien" }, { code: "C03L07", name: "Lymphome non Hodgkinien" }, { code: "C03L08", name: "Lymphome de Burkitt" }, { code: "C03L09", name: "Maladie de Vaquez [MV] (= Polyglobulie vraie [PV])" }, { code: "C03L10", name: "Autres cancers du sang" }, { code: "C03L11", name: "Myélome multiple" }] },
        { code: "C03M", name: "Autres cancers de système endocrine", children: [{ code: "C03M01", name: "Cancer de la thyroïde" }, { code: "C03M02", name: "Cancer de la parathyroïde" }, { code: "C03M03", name: "Cancer de la surrénale" }] },
        { code: "C03N", name: "Cancers des os et du cartilage", children: [{ code: "C03N01", name: "Ostéosarcome" }, { code: "C03N02", name: "Chondrosarcome ( tumeur cartilaginea)" }, { code: "C03N03", name: "Sarcome d'Ewing" }, { code: "C03N04", name: "Autres cancers des os et du cartilage" }] },
        { code: "C03O", name: "Cancers des tissus mous et tissus conjonctifs", children: [{ code: "C03O01", name: "Liposarcome" }, { code: "C03O02", name: "Rhabdomyosarcome" }, { code: "C03O03", name: "Leiomyosarcome" }, { code: "C03O04", name: "Angiosarcome" }, { code: "C03O05", name: "Sarcome de Kaposi" }, { code: "C03O06", name: "Fibrosarcome" }, { code: "C03O07", name: "Autres cancers des tissus mous et tissus conjonct" }] },
        { code: "C03P", name: "Cancers de la peau", children: [{ code: "C03P01", name: "Carcinome basocellulaire" }, { code: "C03P02", name: "Carcinome épidélial (spinocellulaire)" }, { code: "C03P03", name: "Mélanome" }, { code: "C03P04", name: "Autres cancers de la peau" }] },
        { code: "C03Q", name: "Autres Cancers", children: [{ code: "C03Q01", name: "Autres cancers" }] }
    ],
  },
  {
    code: "C04",
    name: "Les hémopathies",
    children: [
        { 
          code: "C04A", 
          name: "Anémies hémolytiques chroniques",
          tooltip: `<div class="space-y-3">
            <h3 class="font-bold text-lg text-primary-700">🩸 ANÉMIES HÉMOLYTIQUES CHRONIQUES</h3>
            
            <div>
              <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
              <p class="text-sm">
                L'anémie hémolytique chronique est une anémie due à une <strong>destruction prématurée des globules rouges (hémolyse)</strong> dépassant la capacité de production médullaire, durable dans le temps (<strong>chronique, >3 mois</strong>).
              </p>
              <ul class="text-sm list-disc list-inside ml-2 mt-1">
                <li>Peut être <strong>congénitale</strong> (intrinsèque aux GR) ou <strong>acquise</strong> (immunologique ou non immunologique)</li>
                <li><strong>Résultat clinique</strong> : anémie de gravité variable, ictère, splénomégalie, parfois calculs biliaires pigmentaires</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">2️⃣ Physiopathologie</h4>
              <p class="text-sm">La destruction des globules rouges entraîne :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Libération de <strong>bilirubine indirecte</strong> → ictère, lithiases biliaires</li>
                <li>Augmentation de la <strong>LDH</strong> et <strong>haptoglobine diminuée</strong></li>
                <li>Compensée par hyperactivité médullaire → <strong>réticulocytose</strong></li>
                <li><strong>Hémolyse intravasculaire</strong> : destruction dans les vaisseaux, hémoglobine libre plasmatique</li>
                <li><strong>Hémolyse extravasculaire</strong> : destruction dans la rate et le foie</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">3️⃣ Classification</h4>
              
              <p class="text-sm font-semibold mt-2">A. Selon l'étiologie</p>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1 mb-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Type</th>
                    <th class="border border-gray-300 p-2 text-left">Exemple</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Congénitale / héréditaire</td>
                    <td class="border border-gray-300 p-2">Déficit enzymatique (G6PD, pyruvate kinase), anomalies membranaires (sphérocytose héréditaire), anomalies de l'hémoglobine (drépanocytose, thalassémie majeure)</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Acquise</td>
                    <td class="border border-gray-300 p-2"><strong>Immunologique</strong> : AHAI à IgG ou IgM, allo-immunisation<br><strong>Non immunologique</strong> : microangiopathique (MAHA), infections, médicaments, toxiques</td>
                  </tr>
                </tbody>
              </table>

              <p class="text-sm font-semibold mt-2">B. Selon le mécanisme</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Hémolyse extravasculaire</strong> : rate, foie (ex : sphérocytose héréditaire, AHAI à IgG)</li>
                <li><strong>Hémolyse intravasculaire</strong> : circulation (ex : hémoglobinurie paroxystique nocturne, MAHA)</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">4️⃣ Signes cliniques</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Anémie chronique</strong> : fatigue, dyspnée d'effort, pâleur</li>
                <li><strong>Ictère</strong> : jaunisse modérée (bilirubine indirecte)</li>
                <li><strong>Splénomégalie</strong> : surtout dans les formes extravasculaires chroniques</li>
                <li><strong>Gallstones pigmentaires</strong> : complication fréquente</li>
                <li><strong>Crises hémolytiques aiguës</strong> possibles dans certaines maladies (G6PD, drépanocytose)</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">5️⃣ Signes biologiques</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Paramètre</th>
                    <th class="border border-gray-300 p-2 text-left">Observation typique</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Hb</td><td class="border border-gray-300 p-2">↓ selon sévérité</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Réticulocytes</td><td class="border border-gray-300 p-2">↑ (réponse médullaire)</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">LDH</td><td class="border border-gray-300 p-2">↑ (signe d'hémolyse intravasculaire)</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Bilirubine indirecte</td><td class="border border-gray-300 p-2">↑</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Haptoglobine</td><td class="border border-gray-300 p-2">↓</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Frottis sanguin</td><td class="border border-gray-300 p-2">Anomalies spécifiques : sphérocytes, schizocytes, cellules falciformes</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Test de Coombs</td><td class="border border-gray-300 p-2">Positif dans AHAI (IgG ou IgM)</td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">6️⃣ Principales causes</h4>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Congénitales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Sphérocytose héréditaire</strong> : GR sphériques → destruction splénique, osmotic fragility test ↑</li>
                  <li><strong>Déficit enzymatique</strong> : G6PD (crises après stress oxydatif), Pyruvate kinase (anémie chronique)</li>
                  <li><strong>Hémoglobinopathies</strong> : Drépanocytose (SS), Thalassémies (anémie microcytaire, surcharge fer)</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2">
                <p class="text-sm font-semibold">B. Acquises</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>AHAI</strong> : IgG (chaud, extravasculaire) → corticostéroïdes, IgM (froid, intravasculaire)</li>
                  <li><strong>Anémies microangiopathiques</strong> : Schizocytes au frottis, PTT chronique, HUS adulte</li>
                  <li><strong>Hémoglobinurie paroxystique nocturne (HPN)</strong> : Hémolyse intravasculaire, hémoglobinurie matinale, thromboses</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">7️⃣ Examens complémentaires</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Frottis sanguin</strong> : anomalies morphologiques</li>
                <li><strong>Test de Coombs</strong> direct et indirect : AHAI</li>
                <li><strong>Bilan enzymatique</strong> : G6PD, pyruvate kinase</li>
                <li><strong>Électrophorèse de l'hémoglobine</strong> : drépanocytose, thalassémie</li>
                <li><strong>Bilan de l'hémolyse</strong> : LDH, bilirubine, haptoglobine</li>
                <li><strong>Imagerie</strong> : échographie abdominale si splénomégalie ou lithiase biliaire</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">8️⃣ Traitement</h4>
              
              <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Causes congénitales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Sphérocytose</strong> : splénectomie si anémie modérée à sévère</li>
                  <li><strong>Drépanocytose</strong> : hydroxyurée, transfusions chroniques, prise en charge des complications</li>
                  <li><strong>Déficits enzymatiques</strong> : éviter les déclencheurs (médicaments, infections, stress oxydatif)</li>
                </ul>
              </div>

              <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Causes acquises</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>AHAI à IgG</strong> : corticostéroïdes, immunosuppresseurs, splénectomie si réfractaire</li>
                  <li><strong>AHAI à IgM</strong> : éviter le froid, traitement spécifique selon la cause</li>
                  <li><strong>HPN</strong> : inhibiteurs du complément (eculizumab)</li>
                  <li><strong>MAHA chronique</strong> : traiter la cause sous-jacente</li>
                </ul>
              </div>

              <div class="bg-teal-50 border-l-4 border-teal-500 p-2">
                <p class="text-sm font-semibold">C. Mesures générales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Transfusions</strong> si anémie sévère</li>
                  <li><strong>Surveillance</strong> des calculs biliaires</li>
                  <li><strong>Supplémentation en acide folique</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">9️⃣ Complications</h4>
              <div class="bg-red-50 border-l-4 border-red-500 p-2">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Anémie sévère</strong> → fatigue, dyspnée, insuffisance cardiaque</li>
                  <li><strong>Ictère chronique et lithiase biliaire</strong></li>
                  <li><strong>Surcharge en fer</strong> (transfusions répétées)</li>
                  <li><strong>Splénomégalie massive</strong> → risque de rupture ou hypersplénisme</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">1️⃣0️⃣ Pronostic</h4>
              <div class="bg-slate-100 p-2 rounded">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Variable selon l'étiologie</strong></li>
                  <li><strong>Congénitales</strong> : souvent chronique mais compatible avec vie normale</li>
                  <li><strong>Acquises</strong> : bonne réponse aux traitements immunosuppresseurs et prise en charge spécifique</li>
                  <li><strong>Complications</strong> : thromboses, insuffisance cardiaque secondaire, infections</li>
                </ul>
              </div>
            </div>
          </div>`,
          children: [{ code: "C04A01", name: "Déficit enzymatique en G6-PD et pyruvate kinase" }, { code: "C04A02", name: "Maladie de Minkowski-Chauffard (microsphérocytose)" }, { code: "C04A03", name: "Thalassémies majeures et intermédiaires" }, { code: "C04A04", name: "Drépanocytose (hémoglobinose S)" }, { code: "C04A05", name: "Autre anémies hémolytiques chroniques" }] 
        },
        { 
          code: "C04B", 
          name: "Affections graves de l'hémostase",
          tooltip: `<div class="space-y-3">
            <h3 class="font-bold text-lg text-primary-700">🩸 AFFECTIONS GRAVES DE L'HÉMOSTASE</h3>
            
            <div>
              <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
              <p class="text-sm">
                Les affections graves de l'hémostase sont des <strong>troubles de la coagulation</strong> pouvant entraîner <strong>saignements massifs ou thromboses sévères</strong>, dus à des anomalies des plaquettes, des facteurs de coagulation ou des inhibiteurs physiologiques de la coagulation.
              </p>
              <p class="text-sm mt-1">Elles se classent en deux grands types :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Hémorragiques</strong> → saignements majeurs</li>
                <li><strong>Thrombotiques</strong> → thromboses veineuses ou artérielles</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">2️⃣ Mécanismes physiopathologiques</h4>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Déficit plaquettaire ou dysfonction plaquettaire</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Thrombopénie</strong> : diminution du nombre de plaquettes</li>
                  <li><strong>Thrombopathie</strong> : défaut qualitatif des plaquettes</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Déficit en facteurs de coagulation</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Congénital</strong> : hémophilies A et B, maladie de Willebrand sévère</li>
                  <li><strong>Acquis</strong> : carence en vitamine K, hépatopathie, traitement anticoagulant</li>
                </ul>
              </div>

              <div class="bg-red-50 border-l-4 border-red-500 p-2 mb-2">
                <p class="text-sm font-semibold">C. Hypercoagulabilité</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Thrombophilies congénitales</strong> : mutation du facteur V Leiden, déficit en protéine C/S, antithrombine</li>
                  <li><strong>Thrombophilies acquises</strong> : syndrome des antiphospholipides</li>
                </ul>
              </div>

              <div class="bg-orange-50 border-l-4 border-orange-500 p-2">
                <p class="text-sm font-semibold">D. Consommation excessive de facteurs (coagulopathie de consommation)</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>CIVD</strong> (Coagulation IntraVasculaire Disséminée) → microthromboses + hémorragies</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">3️⃣ Affections hémorragiques graves</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Affection</th>
                    <th class="border border-gray-300 p-2 text-left">Mécanisme</th>
                    <th class="border border-gray-300 p-2 text-left">Clinique</th>
                    <th class="border border-gray-300 p-2 text-left">Examens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Hémophilie A (FVIII)</td>
                    <td class="border border-gray-300 p-2">Déficit congénital en facteur VIII</td>
                    <td class="border border-gray-300 p-2">Hémorragies articulaires et musculaires, ecchymoses</td>
                    <td class="border border-gray-300 p-2">TCA allongé, TP normal, dosage FVIII ↓</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Hémophilie B (FIX)</td>
                    <td class="border border-gray-300 p-2">Déficit congénital en facteur IX</td>
                    <td class="border border-gray-300 p-2">Comme A</td>
                    <td class="border border-gray-300 p-2">TCA allongé, dosage FIX ↓</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Maladie de Willebrand sévère</td>
                    <td class="border border-gray-300 p-2">Déficit en VWF</td>
                    <td class="border border-gray-300 p-2">Saignements muqueux : épistaxis, gingivorragies, ménorragies</td>
                    <td class="border border-gray-300 p-2">TCA +/- allongé, temps de saignement ↑, VWF ↓</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Déficit vitaminique K / hépatopathie</td>
                    <td class="border border-gray-300 p-2">Carence en facteurs II, VII, IX, X</td>
                    <td class="border border-gray-300 p-2">Ecchymoses, hématomes</td>
                    <td class="border border-gray-300 p-2">TCA ↑, TP ↑, facteurs ↓</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">CIVD</td>
                    <td class="border border-gray-300 p-2">Consommation de facteurs et plaquettes</td>
                    <td class="border border-gray-300 p-2">Saignements multiples + signes de microthromboses</td>
                    <td class="border border-gray-300 p-2">TP ↑, TCA ↑, fibrinogène ↓, D-dimères ↑, plaquettes ↓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">4️⃣ Affections thrombotiques graves</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Affection</th>
                    <th class="border border-gray-300 p-2 text-left">Mécanisme</th>
                    <th class="border border-gray-300 p-2 text-left">Clinique</th>
                    <th class="border border-gray-300 p-2 text-left">Examens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Thrombophilie congénitale</td>
                    <td class="border border-gray-300 p-2">Mutation FV Leiden, déficit protéine C/S, antithrombine</td>
                    <td class="border border-gray-300 p-2">TVP, embolie pulmonaire</td>
                    <td class="border border-gray-300 p-2">Test génétique, dosage protéines C/S, antithrombine</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Syndrome des antiphospholipides</td>
                    <td class="border border-gray-300 p-2">Anticorps anti-cardiolipine, lupus anticoagulant</td>
                    <td class="border border-gray-300 p-2">TVP, AVC, grossesse compliquée</td>
                    <td class="border border-gray-300 p-2">APTT ↑ in vitro, anticorps anticardiolipine, lupus anticoagulant</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Syndrome post-thrombotique sévère</td>
                    <td class="border border-gray-300 p-2">Conséquence d'une TVP non traitée</td>
                    <td class="border border-gray-300 p-2">Œdème, ulcères veineux chroniques</td>
                    <td class="border border-gray-300 p-2">Écho-Doppler veineux</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Thromboses artérielles</td>
                    <td class="border border-gray-300 p-2">Facteurs multiples (hypercoagulabilité, athérosclérose)</td>
                    <td class="border border-gray-300 p-2">AVC, IDM, ischémie aiguë</td>
                    <td class="border border-gray-300 p-2">Biologie selon contexte, imagerie vasculaire</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">5️⃣ Signes cliniques d'alerte</h4>
              
              <div class="bg-red-50 p-2 rounded mb-2">
                <p class="text-sm font-semibold">Hémorragiques</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Hémorragies articulaires/musculaires</li>
                  <li>Purpura, ecchymoses spontanées</li>
                  <li>Saignements prolongés après traumatisme ou chirurgie</li>
                  <li>Hémorragies digestives ou intracrâniennes</li>
                </ul>
              </div>

              <div class="bg-yellow-50 p-2 rounded">
                <p class="text-sm font-semibold">Thrombotiques</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>TVP</strong> : douleur, gonflement, chaleur, rougeur</li>
                  <li><strong>Embolie pulmonaire</strong> : dyspnée, douleur thoracique, tachycardie</li>
                  <li><strong>Thromboses artérielles</strong> : déficit neurologique, douleur aiguë, ischémie des extrémités</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">6️⃣ Examens complémentaires</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Examen</th>
                    <th class="border border-gray-300 p-2 text-left">Utilité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="border border-gray-300 p-2 font-semibold">NFS, plaquettes</td><td class="border border-gray-300 p-2">Thrombopénie</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">TP, TCA, fibrinogène, D-dimères</td><td class="border border-gray-300 p-2">Dépistage coagulopathie</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Dosage facteurs de coagulation</td><td class="border border-gray-300 p-2">Diagnostic précis hémophilies, carences</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Test de fonction plaquettaire</td><td class="border border-gray-300 p-2">Thrombopathies</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Recherche anticorps antiphospholipides</td><td class="border border-gray-300 p-2">Syndrome des antiphospholipides</td></tr>
                  <tr><td class="border border-gray-300 p-2 font-semibold">Imagerie vasculaire (Écho-Doppler, angio-CT)</td><td class="border border-gray-300 p-2">Thromboses</td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">7️⃣ Principes de traitement</h4>
              
              <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Hémorragies</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Substitution</strong> des facteurs manquants (FVIII, FIX, VWF)</li>
                  <li><strong>Vitamine K</strong> si déficit acquis</li>
                  <li><strong>Transfusion de concentrés plaquettaires</strong> si thrombopénie sévère</li>
                  <li><strong>Plasma frais congelé ou cryoprécipité</strong> si CIVD</li>
                </ul>
              </div>

              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Thromboses</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Anticoagulation</strong> : héparine, AVK, AOD selon contexte</li>
                  <li><strong>Thrombolyse en urgence</strong> pour embolie massive ou thromboses artérielles graves</li>
                  <li><strong>Traitement des facteurs sous-jacents</strong> : déficits protéine C/S, syndrome des antiphospholipides</li>
                </ul>
              </div>

              <div class="bg-teal-50 border-l-4 border-teal-500 p-2">
                <p class="text-sm font-semibold">C. Mesures générales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Surveillance</strong> des complications hémorragiques ou thrombo-emboliques</li>
                  <li><strong>Traitement des causes sous-jacentes</strong> (infection, cancer, hépatopathie)</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">8️⃣ Complications graves</h4>
              <div class="bg-red-100 border-l-4 border-red-600 p-2">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>⚠️ Hémorragies intracrâniennes</strong> (hémophilie, CIVD)</li>
                  <li><strong>⚠️ Choc hémorragique</strong></li>
                  <li><strong>⚠️ Embolie pulmonaire massive</strong></li>
                  <li><strong>⚠️ Thromboses artérielles avec ischémie critique</strong></li>
                  <li><strong>⚠️ Insuffisance multiviscérale en CIVD</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">9️⃣ Pronostic</h4>
              <div class="bg-slate-100 p-2 rounded">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Dépend fortement de la <strong>rapidité du diagnostic</strong>, gravité initiale et prise en charge spécialisée</li>
                  <li>Les progrès en <strong>traitements substitutifs et anticoagulants modernes</strong> ont amélioré le pronostic global</li>
                </ul>
              </div>
            </div>
          </div>`,
          children: [{ code: "C04B01", name: "Hémophilie A" }, { code: "C04B02", name: "Hémophilie B" }, { code: "C04B03", name: "Maladie de von Willebrand" }, { code: "C04B04", name: "Déficits en facteurs de la coagulation" }, { code: "C04B05", name: "Purpura thrombopénique immunologique chroniqu" }, { code: "C04B06", name: "Autres affections graves de l'hémostase" }] 
        },
        { 
          code: "C04C", 
          name: "Insuffisance médullaire",
          tooltip: `<div class="space-y-3">
            <h3 class="font-bold text-lg text-primary-700">🦴 INSUFFISANCE MÉDULLAIRE</h3>
            <p class="text-xs italic text-gray-600">(Aplasie médullaire / Pancytopénie)</p>
            
            <div>
              <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
              <p class="text-sm">
                L'insuffisance médullaire correspond à une <strong>diminution de la production des cellules sanguines</strong> par la moelle osseuse, entraînant une ou plusieurs <strong>cytopénies</strong> :
              </p>
              <ul class="text-sm list-disc list-inside ml-2 mt-1">
                <li><strong>Anémie</strong> (GR)</li>
                <li><strong>Leucopénie</strong> (GB)</li>
                <li><strong>Thrombopénie</strong> (plaquettes)</li>
              </ul>
              <p class="text-sm mt-1">
                Quand toutes les lignées sont touchées → <strong>pancytopénie</strong>.<br>
                L'insuffisance peut être <strong>aiguë ou chronique</strong>.
              </p>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">2️⃣ Étiopathogénie</h4>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Congénitale</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Syndrome de Fanconi</strong> : aplasie progressive, anomalies congénitales</li>
                  <li><strong>Syndrome de Diamond-Blackfan</strong> : anémie isolée, malformations congénitales</li>
                  <li>Syndromes dysméliens ou trisomiques</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2">
                <p class="text-sm font-semibold">B. Acquise</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Idiopathique</strong> → Aplasie médullaire auto-immune (70% des cas)</li>
                  <li><strong>Secondaire</strong> :
                    <ul class="list-circle list-inside ml-4">
                      <li>Médicaments (chloramphénicol, cytotoxiques)</li>
                      <li>Radiations ionisantes</li>
                      <li>Infections virales (EBV, parvovirus B19, hépatite virale)</li>
                      <li>Maladies auto-immunes</li>
                      <li>Déficit en vitamine B12 ou folates sévère (forme pseudo-aplasique)</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">3️⃣ Physiopathologie</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Dépression ou destruction</strong> des cellules souches hématopoïétiques</li>
                <li><strong>Apoptose médullaire accrue</strong> par auto-immunité (lymphocytes T cytotoxiques)</li>
                <li>Diminution progressive de toutes les lignées cellulaires → <strong>pancytopénie</strong></li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">4️⃣ Signes cliniques</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Cytopénie</th>
                    <th class="border border-gray-300 p-2 text-left">Manifestations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Anémie</td>
                    <td class="border border-gray-300 p-2">Fatigue, pâleur, dyspnée, tachycardie</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Leucopénie / neutropénie</td>
                    <td class="border border-gray-300 p-2">Infections répétées, fièvre, ulcérations, sepsis</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Thrombopénie</td>
                    <td class="border border-gray-300 p-2">Purpura, ecchymoses, épistaxis, gingivorragies, hémorragies graves</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Splénomégalie / hépatomégalie</td>
                    <td class="border border-gray-300 p-2">Rare dans aplasies idiopathiques, plus fréquente dans syndromes secondaires</td>
                  </tr>
                </tbody>
              </table>
              
              <div class="mt-2 text-sm">
                <p><strong>Formes aiguës</strong> : apparition rapide, pancytopénie sévère → urgences vitales</p>
                <p><strong>Formes chroniques</strong> : apparition insidieuse, cytopénies modérées</p>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">5️⃣ Examens complémentaires</h4>
              
              <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Biologie de base</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>NFS</strong> : anémie, neutropénie, thrombopénie</li>
                  <li><strong>Réticulocytes</strong> : bas ou absents (réflexe médullaire insuffisant)</li>
                  <li><strong>Marqueurs inflammatoires</strong> : CRP, hémocultures si infection</li>
                </ul>
              </div>

              <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Myélogramme</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Cellularité médullaire faible ou nulle</strong> (<25%)</li>
                  <li>Absence ou rareté des précurseurs</li>
                  <li>Pas de infiltration leucémique</li>
                </ul>
              </div>

              <div class="bg-teal-50 border-l-4 border-teal-500 p-2 mb-2">
                <p class="text-sm font-semibold">C. Biopsie ostéomédullaire</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Confirmation de l'<strong>hypocellularité</strong></li>
                  <li>Permet de rechercher <strong>infiltration tumorale ou fibrose</strong></li>
                </ul>
              </div>

              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2">
                <p class="text-sm font-semibold">D. Bilan étiologique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li>Sérologie virale (EBV, parvovirus B19, hépatite)</li>
                  <li>Dosage vitamine B12 / folates</li>
                  <li>Caryotype si suspicion congénitale ou myélodysplasique</li>
                  <li>Recherche auto-anticorps si suspicion aplasie auto-immune</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">6️⃣ Traitement</h4>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Mesures générales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Surveillance</strong> hémodynamique et infection</li>
                  <li><strong>Transfusions</strong> : concentrés de globules rouges et plaquettes selon besoin</li>
                  <li><strong>Antibiothérapie</strong> prophylactique ou curative selon neutropénie</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2">
                <p class="text-sm font-semibold">B. Traitement spécifique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Immunosuppresseurs</strong> (si aplasie idiopathique) : ATG (anticorps anti-thymocytes), ciclosporine</li>
                  <li><strong>Greffe de cellules souches hématopoïétiques</strong> : Indiquée surtout chez les jeunes patients avec aplasie sévère</li>
                  <li><strong>Facteurs de croissance</strong> : G-CSF pour neutropénie sévère</li>
                  <li><strong>Traitement étiologique</strong> : Arrêt du médicament responsable, traitement de l'infection ou correction nutritionnelle</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">7️⃣ Complications</h4>
              <div class="bg-red-50 border-l-4 border-red-500 p-2">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>⚠️ Infections sévères</strong> → septicémie</li>
                  <li><strong>⚠️ Hémorragies graves</strong> → épistaxis, saignement digestif ou intracrânien</li>
                  <li><strong>⚠️ Transformation secondaire</strong> → myélodysplasie ou leucémie aiguë (rare)</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">8️⃣ Pronostic</h4>
              <div class="bg-slate-100 p-2 rounded">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Dépend de la cause et de la gravité</strong></li>
                  <li><strong>Aplasies idiopathiques sévères non traitées</strong> → mortalité élevée (>70%)</li>
                  <li><strong>Avec greffe ou immunosuppresseurs</strong> → survie à long terme >70%</li>
                  <li><strong>Complications infectieuses et hémorragiques</strong> restent principales causes de mortalité</li>
                </ul>
              </div>
            </div>
          </div>`,
          children: [{ code: "C04C01", name: "Insuffisance médullaire chronique" }, { code: "C04C02", name: "Aplasie médullaire" }] 
        },
        { 
          code: "C04D", 
          name: "Myélodysplasies",
          tooltip: `<div class="space-y-3">
            <h3 class="font-bold text-lg text-primary-700">🧬 MYÉLODYSPLASIES (MDS)</h3>
            
            <div>
              <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
              <p class="text-sm">Groupe hétérogène de <strong>syndromes clonaux médullaires</strong> caractérisés par :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Dysplasie</strong> des lignées médullaires</li>
                <li><strong>Cytopénies périphériques</strong> (anémie, neutropénie, thrombopénie)</li>
                <li><strong>Risque élevé de transformation en leucémie aiguë myéloïde (LAM)</strong></li>
                <li>Maladies principalement du <strong>sujet âgé (>60 ans)</strong></li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">2️⃣ Étiopathogénie</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Primaire / idiopathique</strong> : liée au vieillissement médullaire et mutations somatiques</li>
                <li><strong>Secondaire / acquise</strong> : après chimiothérapie ou radiothérapie (MDS post-traitement), exposition à des toxiques (benzène, solvants)</li>
                <li><strong>Anomalies génétiques</strong> : délétion 5q, trisomie 8, anomalies complexes du caryotype</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">3️⃣ Physiopathologie</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Hématopoïèse inefficace</strong> : mort prématurée des précurseurs → cytopénies</li>
                <li><strong>Dysplasie morphologique</strong> : anomalies nucléaires, cytoplasmiques, maturation aberrante</li>
                <li><strong>Clonalité</strong> : expansion d'une lignée clonale anormale → risque leucémique</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">4️⃣ Clinique</h4>
              <p class="text-sm"><strong>Souvent asymptomatique au début</strong> → découverte fortuite sur NFS</p>
              <p class="text-sm mt-1">Symptômes liés aux cytopénies :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Anémie</strong> : fatigue, pâleur, dyspnée</li>
                <li><strong>Neutropénie</strong> : infections fréquentes</li>
                <li><strong>Thrombopénie</strong> : ecchymoses, saignements faciles</li>
                <li><strong>Splénomégalie</strong> : rare</li>
                <li><strong>Signes systémiques</strong> : fièvre, perte de poids, sueurs nocturnes</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">5️⃣ Examens complémentaires</h4>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Biologie sanguine</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Anémie</strong> : souvent macrocytaire, réticulocytes bas</li>
                  <li><strong>Leucopénie et/ou neutropénie</strong></li>
                  <li><strong>Thrombopénie</strong> variable</li>
                  <li><strong>Frottis</strong> : anisopoïkilocytose, hypersegmentation des neutrophiles, mégaloblastose</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Myélogramme</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Cellularité variable</strong> : hypocellulaire ou hypercellulaire</li>
                  <li><strong>Dysplasie</strong> :
                    <ul class="list-circle list-inside ml-4">
                      <li>GR : anomalies nucléaires, taille variable</li>
                      <li>Neutrophiles : hypogranulation, pseudo-Pelger-Huët</li>
                      <li>Plaquettes : mégacaryocytes dysplasiques</li>
                    </ul>
                  </li>
                  <li><strong>Blastes médullaires</strong> : <20% (≥20% → leucémie aiguë)</li>
                </ul>
              </div>

              <div class="bg-green-50 border-l-4 border-green-500 p-2">
                <p class="text-sm font-semibold">C. Caryotype / génétique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Délétion 5q</strong> → MDS à bon pronostic</li>
                  <li><strong>Anomalies complexes</strong> → mauvais pronostic</li>
                  <li><strong>Mutations</strong> : TP53, SF3B1, TET2</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">6️⃣ Classification (OMS 2022)</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>MDS avec <strong>Sidéroblastes en anneau</strong> (Sideroblastic anemia)</li>
                <li>MDS avec <strong>délétion 5q</strong></li>
                <li>MDS <strong>multi-lignées dysplasiques</strong></li>
                <li>MDS avec <strong>excès de blastes</strong></li>
                <li>MDS <strong>non classé</strong></li>
              </ul>
              <p class="text-sm mt-1"><strong>Score pronostique</strong> : IPSS-R (Cytopénies, Blastes, Caryotype)</p>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">7️⃣ Complications</h4>
              <div class="bg-red-50 border-l-4 border-red-500 p-2">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>⚠️ Transformation en LAM</strong> : 20–40% selon type</li>
                  <li><strong>Infections</strong> : neutropénie</li>
                  <li><strong>Saignements</strong> : thrombopénie</li>
                  <li><strong>Anémie sévère</strong> → insuffisance cardiaque</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">8️⃣ Traitement</h4>
              
              <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Support</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Transfusions</strong> de concentrés globulaires et plaquettes</li>
                  <li><strong>Facteur stimulant l'érythropoïèse (ESAs)</strong> si anémie réfractaire</li>
                  <li><strong>Antibiotiques prophylactiques</strong> si neutropénie sévère</li>
                </ul>
              </div>

              <div class="bg-teal-50 border-l-4 border-teal-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Traitement spécifique</p>
                
                <p class="text-sm mt-1"><strong>MDS à faible risque :</strong></p>
                <ul class="text-sm list-disc list-inside ml-4">
                  <li>Surveillance, ESAs, thalidomide ou <strong>lénalidomide (5q-)</strong></li>
                </ul>
                
                <p class="text-sm mt-1"><strong>MDS à haut risque :</strong></p>
                <ul class="text-sm list-disc list-inside ml-4">
                  <li>Chimiothérapie hypométhylante : <strong>azacitidine, décitabine</strong></li>
                  <li><strong>Greffe allogénique de cellules souches hématopoïétiques (GSCH)</strong> → seule option curative</li>
                </ul>
              </div>

              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2">
                <p class="text-sm font-semibold">Transfusions répétées</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Risque de surcharge en fer</strong> → chélation ferrique</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">9️⃣ Pronostic</h4>
              <div class="bg-slate-100 p-2 rounded">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Variable selon type et score IPSS-R</strong></li>
                  <li><strong>Bon pronostic</strong> : MDS isolée 5q, faible cytopénie, pas d'anomalie complexe</li>
                  <li><strong>Mauvais pronostic</strong> : >5% blastes médullaires, anomalies complexes, pancytopénie sévère</li>
                  <li><strong>Espérance de vie</strong> : de 2–3 ans (haut risque) à >10 ans (bas risque)</li>
                </ul>
              </div>
            </div>
          </div>`,
          children: [{ code: "C04D01", name: "Myélodysplasies" }] 
        },
        { 
          code: "C04E", 
          name: "Déficits immunitaires graves",
          tooltip: `<div class="space-y-3">
            <h3 class="font-bold text-lg text-primary-700">🛡️ DÉFICITS IMMUNITAIRES GRAVES</h3>
            <p class="text-xs italic text-gray-600">(Primary Immunodeficiencies – PID)</p>
            
            <div>
              <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
              <p class="text-sm">
                Ensemble de troubles <strong>congénitaux ou acquis</strong> du système immunitaire entraînant une <strong>susceptibilité sévère aux infections</strong>.
              </p>
              <p class="text-sm mt-1">Les déficits peuvent toucher :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Immunité humorale</strong> (anticorps)</li>
                <li><strong>Immunité cellulaire</strong> (lymphocytes T)</li>
                <li><strong>Phagocytes</strong></li>
                <li><strong>Complément</strong></li>
              </ul>
              <p class="text-sm mt-1">
                Considérés comme <strong>graves</strong> lorsqu'ils entraînent infections récurrentes sévères, opportunistes, ou menaçant le pronostic vital.
              </p>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">2️⃣ Classification principale</h4>
              
              <div class="bg-red-50 border-l-4 border-red-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Déficits combinés sévères (SCID)</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Absence ou dysfonction</strong> des lymphocytes T, parfois B et NK</li>
                  <li><strong>Infections sévères dès la naissance</strong> : bactéries, virus, champignons</li>
                  <li><strong>Formes</strong> : X-linked SCID (γc), ADA deficiency, JAK3 deficiency</li>
                  <li><strong>⚠️ Pronostic sans traitement</strong> : mort dans la première année</li>
                </ul>
              </div>

              <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                <p class="text-sm font-semibold">B. Déficits en lymphocytes B (humoraux)</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Hypogammaglobulinémie sévère</strong></li>
                  <li>Ex : <strong>agammaglobulinémie de Bruton</strong> (X-linked)</li>
                  <li><strong>Infections bactériennes répétées</strong> : pneumonies, otites, sinusites</li>
                  <li><strong>Anomalies</strong> : IgG, IgA, IgM ↓</li>
                </ul>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
                <p class="text-sm font-semibold">C. Déficits du complément</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Déficit en C3</strong> → infections à germes encapsulés (pneumocoques, méningocoques)</li>
                  <li><strong>Déficit en voies terminales (C5–C9)</strong> → méningocoques récurrents</li>
                  <li><strong>Déficit en inhibiteurs du complément</strong> → angioedème héréditaire</li>
                </ul>
              </div>

              <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                <p class="text-sm font-semibold">D. Déficits des phagocytes</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Neutropénie congénitale</strong> ou syndrome de Chédiak-Higashi</li>
                  <li><strong>Infections bactériennes et fongiques sévères</strong></li>
                  <li>Défaut de chimiotaxie, dégranulation ou killing intracellulaire</li>
                </ul>
              </div>

              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2">
                <p class="text-sm font-semibold">E. Déficits immunitaires secondaires graves</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>VIH avancé</strong> (CD4 < 200/mm³)</li>
                  <li><strong>Traitement immunosuppresseur massif</strong> (chimio, greffe, corticostéroïdes)</li>
                  <li><strong>Splénectomie totale</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">3️⃣ Signes cliniques évocateurs</h4>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Infections récurrentes et sévères</strong> : pneumonies, méningites, sepsis</li>
                <li><strong>Infections opportunistes</strong> : Pneumocystis jirovecii, candidoses sévères</li>
                <li><strong>Retard de croissance</strong> et troubles digestifs chroniques</li>
                <li><strong>Absence de réponse aux vaccins</strong></li>
                <li><strong>Famille avec histoire</strong> de décès précoces ou infections sévères</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">4️⃣ Examens complémentaires</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Examen</th>
                    <th class="border border-gray-300 p-2 text-left">Utilité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">NFS, formule leucocytaire</td>
                    <td class="border border-gray-300 p-2">Lymphopénie, neutropénie</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Dosage immunoglobulines (IgG, IgA, IgM, IgE)</td>
                    <td class="border border-gray-300 p-2">Déficits humoraux</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Lymphocyte B/T/NK phenotyping (cytométrie)</td>
                    <td class="border border-gray-300 p-2">Déficits combinés, SCID</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Fonction lymphocytaire (prolifération aux mitogènes)</td>
                    <td class="border border-gray-300 p-2">Évaluer réponse cellulaire</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Fonction phagocytaire (NBT test, DHR test)</td>
                    <td class="border border-gray-300 p-2">CGD, déficits granulocytaires</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Dosage complément (CH50, AH50, composants spécifiques)</td>
                    <td class="border border-gray-300 p-2">Déficits en complément</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-semibold">Sérologie vaccinale</td>
                    <td class="border border-gray-300 p-2">Vérification de réponse humorale</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">5️⃣ Principes de traitement</h4>
              
              <div class="bg-teal-50 border-l-4 border-teal-500 p-2 mb-2">
                <p class="text-sm font-semibold">A. Traitement spécifique</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Substitution immunoglobulinique</strong> (IVIg ou SCIg) pour déficits B sévères</li>
                  <li><strong>Greffe de cellules souches hématopoïétiques (GSCH)</strong> pour SCID et déficits combinés sévères</li>
                  <li><strong>Facteurs de croissance (G-CSF)</strong> pour neutropénie congénitale</li>
                  <li><strong>Antifongiques et antibiotiques prophylactiques</strong> si infections récurrentes</li>
                </ul>
              </div>

              <div class="bg-orange-50 border-l-4 border-orange-500 p-2">
                <p class="text-sm font-semibold">B. Mesures générales</p>
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Hygiène stricte</strong>, isolement protecteur si nécessaire</li>
                  <li><strong>⚠️ Vaccins vivants : contre-indiqués dans SCID</strong></li>
                  <li><strong>Surveillance clinique et biologique régulière</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">6️⃣ Complications</h4>
              <div class="bg-red-100 border-l-4 border-red-600 p-2">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>⚠️ Mort précoce sans traitement dans SCID</strong></li>
                  <li><strong>Infections sévères répétées</strong></li>
                  <li><strong>Retard de croissance et développement</strong></li>
                  <li><strong>Auto-immunité et maladies inflammatoires</strong> (parfois associées)</li>
                  <li><strong>Risque accru de lymphomes ou leucémies</strong> dans certaines PID</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-primary-600">7️⃣ Pronostic</h4>
              <div class="bg-slate-100 p-2 rounded">
                <ul class="text-sm list-disc list-inside ml-2">
                  <li><strong>Dépend du type de déficit et de la rapidité de prise en charge</strong></li>
                  <li><strong>SCID</strong> : mortalité quasi certaine sans GSCH</li>
                  <li><strong>Déficits B isolés</strong> : bonne survie si Ig substitutives régulières</li>
                  <li><strong>Déficits phagocytaires et complément</strong> : pronostic variable selon sévérité et prévention des infections</li>
                </ul>
              </div>
            </div>
          </div>`,
          children: [{ code: "C04E01", name: "Déficits immunitaires primitifs graves" }, { code: "C04E02", name: "Syndrome d'immunodéficience acquise(SIDA maladie" }] 
        },
        { code: "C04F", name: "Autres hémopathies", children: [{ code: "C04F01", name: "Autres hémopathies" }] }
    ],
  },
  {
    code: "C05",
    name: "La Sarcoïdose",
    tooltip: `<div class="space-y-3">
      <h3 class="font-bold text-lg text-primary-700">🫁 SARCOÏDOSE</h3>
      
      <div>
        <h4 class="font-semibold text-primary-600">1️⃣ Définition</h4>
        <p class="text-sm">
          Maladie systémique <strong>granulomateuse non nécrosante</strong>, d'étiologie inconnue.
        </p>
        <ul class="text-sm list-disc list-inside ml-2 mt-1">
          <li>Caractérisée par la formation de <strong>granulomes épithélioïdes et gigantocellulaires</strong> dans différents organes, surtout poumons et ganglions médiastinaux</li>
          <li>Peut toucher tout âge, mais pic entre <strong>30–50 ans</strong></li>
          <li>Évolution souvent bénigne, mais peut devenir <strong>chronique ou fibrosante</strong></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">2️⃣ Étiopathogénie</h4>
        <p class="text-sm"><strong>Hypothèse immunologique</strong> : réponse excessive à un antigène inconnu chez un sujet génétiquement prédisposé</p>
        <p class="text-sm mt-1">Facteurs possibles :</p>
        <ul class="text-sm list-disc list-inside ml-2">
          <li><strong>Génétiques</strong> : HLA-DRB1, HLA-DQB1</li>
          <li><strong>Environnementaux</strong> : poussières organiques ou inorganiques, bactéries (mycobactéries, propionibactéries)</li>
          <li><strong>Immuns</strong> : activation excessive des lymphocytes T CD4+ et macrophages</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">3️⃣ Physiopathologie</h4>
        <ul class="text-sm list-disc list-inside ml-2">
          <li>Inhalation ou exposition à un antigène → <strong>activation des macrophages et lymphocytes T CD4+</strong></li>
          <li><strong>Formation de granulomes non nécrosants</strong></li>
          <li>Libération de cytokines pro-inflammatoires : <strong>TNF-α, IFN-γ</strong></li>
          <li>Dans les poumons : granulomes interstitiels → <strong>fibrose progressive possible</strong></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">4️⃣ Atteinte organique</h4>
        <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 p-2 text-left">Organe</th>
              <th class="border border-gray-300 p-2 text-left">Manifestations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Poumons / médiastin</td>
              <td class="border border-gray-300 p-2">Toux sèche, dyspnée, douleurs thoraciques, syndrome médiastino-pulmonaire sur radiographie</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Ganglions lymphatiques</td>
              <td class="border border-gray-300 p-2">Adenopathies hilaires et médiastinales, souvent asymptomatiques</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Peau</td>
              <td class="border border-gray-300 p-2">Lupus pernio, érythème noueux, nodules</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Yeux</td>
              <td class="border border-gray-300 p-2">Uvéite antérieure ou postérieure, photophobie</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Foie / rate</td>
              <td class="border border-gray-300 p-2">Hépatomégalie, anomalies biologiques, splénomégalie</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Système nerveux</td>
              <td class="border border-gray-300 p-2">Neuropathies craniennes, méningite granulomateuse</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Cœur</td>
              <td class="border border-gray-300 p-2">Arythmies, insuffisance cardiaque, bloc AV</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Reins</td>
              <td class="border border-gray-300 p-2">Hypercalcémie, néphrocalcinose</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-semibold">Os / articulations</td>
              <td class="border border-gray-300 p-2">Arthralgies, atteintes osseuses granulomateuses</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">5️⃣ Formes cliniques</h4>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
          <p class="text-sm font-semibold">A. Aiguë</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Début brutal : fièvre, arthralgies, érythème noueux</li>
            <li><strong>Souvent réversible sans traitement</strong></li>
          </ul>
        </div>

        <div class="bg-orange-50 border-l-4 border-orange-500 p-2 mb-2">
          <p class="text-sm font-semibold">B. Chronique</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Progression insidieuse : toux, dyspnée</li>
            <li><strong>Risque de fibrose pulmonaire, insuffisance respiratoire</strong></li>
          </ul>
        </div>

        <div class="bg-red-50 border-l-4 border-red-500 p-2">
          <p class="text-sm font-semibold">C. Formes systémiques sévères</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>⚠️ Atteinte cardiaque, neurologique ou rénale</strong> → pronostic réservé</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">6️⃣ Signes cliniques respiratoires</h4>
        <ul class="text-sm list-disc list-inside ml-2">
          <li>Toux sèche persistante</li>
          <li>Dyspnée d'effort</li>
          <li>Douleurs thoraciques diffuses</li>
          <li>Rarement hémoptysie</li>
          <li><strong>Souvent asymptomatique et découverte radiologique</strong></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">7️⃣ Signes généraux</h4>
        <ul class="text-sm list-disc list-inside ml-2">
          <li>Fatigue, fièvre modérée, sueurs nocturnes, perte de poids</li>
          <li><strong>Érythème noueux</strong> : prédominance membres inférieurs</li>
          <li><strong>Lupus pernio</strong> : visage, nez, oreilles</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">8️⃣ Examens complémentaires</h4>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
          <p class="text-sm font-semibold">A. Biologie</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>Inflammation</strong> : VS ↑, CRP modérée</li>
            <li><strong>Calcium</strong> : hypercalcémie, hypercalciurie</li>
            <li><strong>Enzymes</strong> : ACE sérique ↑ (70% des cas, non spécifique)</li>
            <li><strong>Fonction hépatique</strong> : anomalies légères</li>
          </ul>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
          <p class="text-sm font-semibold">B. Radiologie thoracique - Stades</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>Stade 0</strong> : Normal</li>
            <li><strong>Stade I</strong> : Adénopathies hilaires bilatérales isolées</li>
            <li><strong>Stade II</strong> : Adénopathies + infiltrats pulmonaires</li>
            <li><strong>Stade III</strong> : Infiltrats pulmonaires sans adénopathies</li>
            <li><strong>Stade IV</strong> : Fibrose pulmonaire</li>
          </ul>
        </div>

        <div class="bg-teal-50 border-l-4 border-teal-500 p-2 mb-2">
          <p class="text-sm font-semibold">C. TDM thoracique</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Nodules parenchymateux, micronodules septaux, adénopathies médiastinales</li>
            <li>Dépistage de la fibrose et surveillance</li>
          </ul>
        </div>

        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2 mb-2">
          <p class="text-sm font-semibold">D. Tests fonctionnels respiratoires</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Restrictifs ou obstructifs selon fibrose</li>
            <li><strong>DLCO ↓</strong> si atteinte interstitielle</li>
          </ul>
        </div>

        <div class="bg-green-50 border-l-4 border-green-500 p-2">
          <p class="text-sm font-semibold">E. Histologie</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>Granulomes épithélioïdes sans nécrose caséeuse</strong></li>
            <li>Biopsie : poumon, peau, ganglions périphériques</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">9️⃣ Diagnostic</h4>
        <ul class="text-sm list-disc list-inside ml-2">
          <li><strong>Clinique + radiologie + histologie granulomateuse</strong></li>
          <li><strong>Exclusion</strong> des autres granulomatoses : tuberculose, mycoses, sarcoïdose médicamenteuse</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">1️⃣0️⃣ Évolution</h4>
        <ul class="text-sm list-disc list-inside ml-2">
          <li><strong>Spontanée</strong> : rémission dans 50% des cas, surtout formes aiguës</li>
          <li><strong>Chronique</strong> : fibrose pulmonaire progressive, atteintes cardiaques ou neurologiques</li>
          <li><strong>Facteurs de mauvais pronostic</strong> : âge >40 ans, fibrose pulmonaire, hypercalciurie sévère, atteinte cardiaque ou neurologique</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">1️⃣1️⃣ Traitement</h4>
        
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-2 mb-2">
          <p class="text-sm font-semibold">A. Indications</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Formes symptomatiques pulmonaires persistantes</li>
            <li>Atteinte cardiaque, neurologique ou ophtalmologique sévère</li>
            <li>Hypercalcémie sévère ou atteinte rénale</li>
          </ul>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-500 p-2 mb-2">
          <p class="text-sm font-semibold">B. Traitement médicamenteux</p>
          <p class="text-sm mt-1"><strong>Corticostéroïdes :</strong></p>
          <ul class="text-sm list-disc list-inside ml-4">
            <li>Prednisone 20–40 mg/j initial → dégression sur 6–12 mois</li>
            <li>Objectif : réduire inflammation et granulomes</li>
          </ul>
          <p class="text-sm mt-1"><strong>Immunosuppresseurs (si échec ou effets secondaires des corticoïdes) :</strong></p>
          <ul class="text-sm list-disc list-inside ml-4">
            <li>Méthotrexate, azathioprine, mycophénolate mofétil</li>
          </ul>
          <p class="text-sm mt-1"><strong>Biothérapie :</strong></p>
          <ul class="text-sm list-disc list-inside ml-4">
            <li>Anti-TNF (infliximab) pour formes réfractaires</li>
          </ul>
        </div>

        <div class="bg-green-50 border-l-4 border-green-500 p-2">
          <p class="text-sm font-semibold">C. Mesures générales</p>
          <ul class="text-sm list-disc list-inside ml-2">
            <li>Surveillance clinique et radiologique régulière</li>
            <li>Vaccinations à jour</li>
            <li>Kinésithérapie respiratoire si atteinte pulmonaire</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">1️⃣2️⃣ Complications</h4>
        <div class="bg-red-50 border-l-4 border-red-500 p-2">
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>⚠️ Fibrose pulmonaire</strong> → insuffisance respiratoire chronique</li>
            <li><strong>⚠️ Hypertension pulmonaire</strong></li>
            <li><strong>⚠️ Atteinte cardiaque</strong> : arythmies, insuffisance cardiaque</li>
            <li><strong>Hypercalcémie</strong> → néphrocalcinose, lithiases</li>
            <li><strong>Atteinte oculaire</strong> → cécité si non traitée</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-primary-600">1️⃣3️⃣ Pronostic</h4>
        <div class="bg-slate-100 p-2 rounded">
          <ul class="text-sm list-disc list-inside ml-2">
            <li><strong>Généralement favorable</strong> : rémission spontanée 50–70%</li>
            <li><strong>Mauvais pronostic</strong> :
              <ul class="list-circle list-inside ml-4">
                <li>Formes fibrosantes (radiographie stade IV)</li>
                <li>Atteinte cardiaque ou neurologique sévère</li>
                <li>Hypercalcémie persistante</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>`,
    children: [
      { code: "C05A", name: "Sarcoïdose intra-thoracique", children: [{ code: "C05A01", name: "Sarcoïdose pulmonaire" }, { code: "C05A02", name: "Sarcoïdose médiastino-pulmonaire" }] },
      { code: "C05B", name: "Sarcoïdose extra-thoracique", children: [{ code: "C05B01", name: "Sarcoïdose des ganglions lymphatiques" }, { code: "C05B02", name: "Sarcoïdose de la peau" }, { code: "C05B03", name: "Sarcoïdose oculaire" }, { code: "C05B04", name: "Autre sarcoïdose extra-thoracique" }] },
      { code: "C05C", name: "Sarcoïdose intra- et extra-thoracique", children: [{ code: "C05C01", name: "Autres sarcoïdoses multi-localisations" }] },
    ],
  },
  {
    code: "C06",
    name: "L'hypertension artérielle maligne",
    children: [{ code: "C06A", name: "HTA maligne", children: [{ code: "C06A01", name: "HTA maligne" }] }],
  },
  {
    code: "C07",
    name: "Les maladies cardiaques et vasculaires",
    children: [
        { 
          code: "C07A", 
          name: "Les maladies cardiaques", 
          children: [
            { 
              code: "C07A01", 
              name: "Angine de poitrine",
              tooltip: `<div class="space-y-3">
                <h3 class="font-bold text-lg text-primary-700">❤️ ANGINE DE POITRINE – FICHE SYNTHÉTIQUE</h3>
                
                <div>
                  <h4 class="font-semibold text-primary-600">📋 Définition</h4>
                  <p class="text-sm">
                    L'angine de poitrine est une <strong>douleur thoracique ou gêne rétrosternale</strong> secondaire à une <strong>ischémie myocardique transitoire</strong>.
                  </p>
                  <ul class="text-sm list-disc list-inside ml-2 mt-1">
                    <li>Elle survient <strong>sans nécrose myocardique</strong> (pas d'infarctus)</li>
                    <li>Elle est le plus souvent liée à l'<strong>athérosclérose coronarienne</strong>, pouvant se manifester sous forme <strong>stable ou instable</strong></li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-semibold text-primary-600">📊 Tableau comparatif des types d'angine</h4>
                  <table class="w-full text-sm border-collapse border border-gray-300 mt-1">
                    <thead>
                      <tr class="bg-gray-200">
                        <th class="border border-gray-300 p-2 text-left">Critère</th>
                        <th class="border border-gray-300 p-2 text-left">Angine stable</th>
                        <th class="border border-gray-300 p-2 text-left">Angine instable</th>
                        <th class="border border-gray-300 p-2 text-left">Angine de Prinzmetal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Définition</td>
                        <td class="border border-gray-300 p-2">Douleur thoracique prévisible à l'effort</td>
                        <td class="border border-gray-300 p-2">Douleur récente ou aggravation, au repos</td>
                        <td class="border border-gray-300 p-2">Douleur au repos, spasme coronaire</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Déclencheurs</td>
                        <td class="border border-gray-300 p-2">Effort, stress, froid</td>
                        <td class="border border-gray-300 p-2">Au repos ou effort minimal</td>
                        <td class="border border-gray-300 p-2">Nuit, repos, parfois effort</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Durée douleur</td>
                        <td class="border border-gray-300 p-2">2–15 min</td>
                        <td class="border border-gray-300 p-2">>15 min possible</td>
                        <td class="border border-gray-300 p-2">2–15 min</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Caractère douleur</td>
                        <td class="border border-gray-300 p-2">Rétrosternale, constrictive, irradiation bras/gauche/jaw</td>
                        <td class="border border-gray-300 p-2">Comme stable, plus intense</td>
                        <td class="border border-gray-300 p-2">Rétrosternale, irradiation classique</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Régression</td>
                        <td class="border border-gray-300 p-2">Repos ou nitrates sublinguaux</td>
                        <td class="border border-gray-300 p-2">Peut persister malgré repos</td>
                        <td class="border border-gray-300 p-2">Nitrates sublinguaux</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">ECG</td>
                        <td class="border border-gray-300 p-2">Normal au repos, sous-décalage ST effort</td>
                        <td class="border border-gray-300 p-2">Sous-décalage ST ou inversion T</td>
                        <td class="border border-gray-300 p-2">Sus-décalage ST transitoire</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Troponines</td>
                        <td class="border border-gray-300 p-2">Normales</td>
                        <td class="border border-gray-300 p-2">Normales ou légèrement ↑</td>
                        <td class="border border-gray-300 p-2">Normales</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Facteurs de risque</td>
                        <td class="border border-gray-300 p-2">HTA, tabac, diabète, dyslipidémie</td>
                        <td class="border border-gray-300 p-2">Comme stable</td>
                        <td class="border border-gray-300 p-2">Comme stable</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Traitement</td>
                        <td class="border border-gray-300 p-2">B-bloquant, nitrate, statine, aspirine</td>
                        <td class="border border-gray-300 p-2">Comme stable + surveillance cardiologique, revascularisation si nécessaire</td>
                        <td class="border border-gray-300 p-2">Inhibiteurs calciques + nitrates</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2 font-semibold">Pronostic</td>
                        <td class="border border-gray-300 p-2">Favorable si traitement et contrôle des facteurs</td>
                        <td class="border border-gray-300 p-2">Risque élevé d'IDM</td>
                        <td class="border border-gray-300 p-2">Variable, souvent bon si traitement efficace</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 class="font-semibold text-primary-600">🔑 Points clés</h4>
                  
                  <div class="bg-blue-50 border-l-4 border-blue-500 p-2 mb-2">
                    <p class="text-sm"><strong>✓ Douleur à l'effort</strong> = suspecter angine stable</p>
                  </div>

                  <div class="bg-red-50 border-l-4 border-red-500 p-2 mb-2">
                    <p class="text-sm"><strong>⚠️ Douleur au repos ou aggravation récente</strong> = urgence cardiologique (angine instable)</p>
                  </div>

                  <div class="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
                    <p class="text-sm"><strong>💊 Nitrates sublinguaux</strong> = test diagnostique et thérapeutique rapide</p>
                  </div>

                  <div class="bg-yellow-50 border-l-4 border-yellow-500 p-2">
                    <p class="text-sm"><strong>🎯 Facteurs de risque cardiovasculaire</strong> = cibler prévention</p>
                  </div>
                </div>
              </div>`
            }, 
            { code: "C07A02", name: "Infarctus du myocarde" }, 
            { code: "C07A03", name: "Pontage aorto-coronarien" }, 
            { code: "C07A04", name: "Valvulopathie décompensée" }, 
            { code: "C07A05", name: "Remplacement valvulaire prothétique" }, 
            { code: "C07A06", name: "Trouble du rythme avec stimulateur" }
          ] 
        },
        { code: "C07B", name: "Les maladies vasculaires", children: [{ code: "C07B01", name: "Maladies athéromateuses évoluées" }, { code: "C07B02", name: "Artérites des membres inférieurs" }, { code: "C07B03", name: "Accident vasculaire cérébral, méningé et cérébro-méningé" }] }
    ],
  },
  {
    code: "C08",
    name: "Maladies neurologiques",
    children: [
        { 
          code: "C08A", 
          name: "Sclérose en plaques", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-blue-800">🧠 SCLÉROSE EN PLAQUES (SEP) – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Maladie inflammatoire chronique démyélinisante</strong> du système nerveux central (SNC)</li>
                <li>Touchant principalement <strong>cerveau, moelle épinière et nerfs optiques</strong></li>
                <li><strong>Maladie auto-immune</strong>, médiée par les lymphocytes T et B</li>
                <li>Évolue par <strong>poussées</strong> ou <strong>forme progressive</strong></li>
                <li>Prévalente chez le <strong>jeune adulte (20–40 ans)</strong>, plus fréquente chez la femme</li>
              </ul>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Prévalence</strong> : 50–200/100 000 selon régions (plus en zones tempérées)</li>
                <li><strong>Sex ratio</strong> : F/H ≈ 2–3/1</li>
                <li><strong>Pic de début</strong> : 20–40 ans</li>
                <li><strong>Facteurs de risque</strong> : génétiques (HLA-DRB1*15:01), environnementaux (vitamine D basse, virus Epstein-Barr)</li>
              </ul>
            </div>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Physiopathologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Activation lymphocytaire anormale contre myéline → <strong>inflammation</strong></li>
                <li>Dégénérescence axonale et perte de myéline → <strong>conduction nerveuse altérée</strong></li>
                <li>Localisation des lésions : <strong>plaques disséminées dans le temps et l'espace</strong></li>
                <li>Sécrétion de cytokines pro-inflammatoires : <strong>TNF-α, IFN-γ</strong></li>
                <li>Réaction microgliale et astrocytaire → <strong>fibrose et cicatrices</strong> (sclérose)</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">4️⃣ Classification clinique selon l'évolution</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>SEP rémittente-récurrente (RRMS)</strong> : poussées avec récupération partielle ou complète</li>
                <li><strong>SEP progressive primaire (PPMS)</strong> : aggravation continue depuis le début</li>
                <li><strong>SEP progressive secondaire (SPMS)</strong> : après phase rémittente-récurrente</li>
                <li><strong>SEP progressive récurrente (PRMS)</strong> : progression continue avec poussées superposées</li>
                <li><strong>Formes optico-spinales</strong> : atteinte prédominante nerf optique et moelle</li>
                <li><strong>Formes bénignes ou fulminantes</strong> (rare)</li>
              </ul>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Manifestations cliniques</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Système</th>
                    <th class="border border-gray-300 p-2 text-left">Symptômes possibles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Neurologique moteur</strong></td>
                    <td class="border border-gray-300 p-2">Faiblesse, spasticité, hyperréflexie, paraparésie, diplégie</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Sensitif</strong></td>
                    <td class="border border-gray-300 p-2">Paresthésies, hypoesthésie, douleur neuropathique</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Optique</strong></td>
                    <td class="border border-gray-300 p-2">Névrite optique : baisse acuité, scotome central, douleur oculaire</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Cérébelleux</strong></td>
                    <td class="border border-gray-300 p-2">Ataxie, dysarthrie, tremblement intentionnel</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>SNC autonome</strong></td>
                    <td class="border border-gray-300 p-2">Incontinence urinaire, constipation, dysfonction érectile</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Cognitif / psychique</strong></td>
                    <td class="border border-gray-300 p-2">Fatigue chronique, troubles attention/mémoire, dépression</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Symptômes déclencheurs</strong></td>
                    <td class="border border-gray-300 p-2">Fièvre, chaleur → pseudo-poussée (signe d'Uhthoff)</td>
                  </tr>
                </tbody>
              </table>
              <p class="text-sm mt-2"><strong>⚡ Signe de Lhermitte</strong> : décharge électrique lors flexion du cou</p>
              <p class="text-sm"><strong>🔑 Clé diagnostique</strong> : Symptômes disséminés dans l'espace et le temps</p>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
              
              <div class="mb-2">
                <h5 class="font-semibold text-teal-800">🔬 A. IRM cérébrale et médullaire</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Plaques <strong>hyperintenses en T2, FLAIR</strong></li>
                  <li>Localisation typique : périventriculaire, juxtacorticale, cerveau postérieur, moelle cervicale</li>
                  <li>Plaques actives : <strong>rehaussées au gadolinium</strong> (inflammation active)</li>
                  <li><strong>Critères de McDonald</strong> : dissémination dans le temps et l'espace</li>
                </ul>
              </div>

              <div class="mb-2">
                <h5 class="font-semibold text-teal-800">🔬 B. Ponction lombaire</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Liquide céphalorachidien : <strong>bandes oligoclonales IgG positives</strong> dans 85–95%</li>
                  <li>Augmentation légère lymphocytaire possible</li>
                </ul>
              </div>

              <div class="mb-2">
                <h5 class="font-semibold text-teal-800">🔬 C. Potentiels évoqués</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Visuels, somesthésiques ou moteurs : <strong>ralentissement de conduction nerveuse</strong></li>
                  <li>Sensibilisation des lésions cliniques silencieuses</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-teal-800">🔬 D. Tests complémentaires</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Bilan biologique : exclure autres causes (lupus, infection, déficit B12)</li>
                </ul>
              </div>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Clinique</strong> : symptômes neurologiques disséminés dans le temps et l'espace</li>
                <li><strong>IRM</strong> : plaques typiques</li>
                <li><strong>LCR</strong> : bandes oligoclonales</li>
                <li><strong>Exclusion des autres pathologies</strong> : neuromyélite optique, vascularite, infection, carences</li>
              </ul>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">8️⃣ Évolution</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>RRMS</strong> : poussées espacées → récupération partielle → risque SPMS après 10–20 ans</li>
                <li><strong>PPMS</strong> : aggravation progressive dès le début</li>
                <li>Fatigue chronique, troubles cognitifs et spasticité limitent autonomie</li>
                <li><strong>Risque de handicap</strong> dépend du type et de la précocité du traitement</li>
              </ul>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">9️⃣ Traitement</h4>
              
              <div class="mb-2">
                <h5 class="font-semibold text-cyan-800">💊 A. Traitement des poussées</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Corticothérapie IV</strong> : méthylprednisolone 1 g/j × 3–5 j</li>
                  <li>Alternative : prednisone orale pour certaines formes</li>
                  <li><strong>But</strong> : accélérer récupération, ne modifie pas la progression</li>
                </ul>
              </div>

              <div class="mb-2">
                <h5 class="font-semibold text-cyan-800">💊 B. Traitement de fond (modificateur de maladie)</h5>
                <p class="text-sm ml-2 mb-1"><strong>RRMS :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Interférons β, acétate de glatiramère</li>
                  <li>Fingolimod, natalizumab, ocrelizumab, siponimod selon sévérité</li>
                </ul>
                <p class="text-sm ml-2 mb-1 mt-2"><strong>SPMS / PPMS :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Ocrelizumab (PPMS)</li>
                  <li>Siponimod (SPMS actif)</li>
                </ul>
                <p class="text-sm ml-2 mt-2"><strong>🎯 Objectif</strong> : réduire fréquence et sévérité des poussées, limiter progression du handicap</p>
              </div>

              <div class="mb-2">
                <h5 class="font-semibold text-cyan-800">💊 C. Traitement symptomatique</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Spasticité</strong> : baclofène, tizanidine</li>
                  <li><strong>Douleur neuropathique</strong> : gabapentine, duloxétine</li>
                  <li><strong>Fatigue</strong> : amantadine, modafinil</li>
                  <li><strong>Dépression / troubles cognitifs</strong> : prise en charge neuropsychologique et médicamenteuse</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-cyan-800">💊 D. Rééducation</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Kinésithérapie motrice et respiratoire</li>
                  <li>Ergothérapie pour autonomie</li>
                  <li>Orthèses si atteinte motrice sévère</li>
                </ul>
              </div>
            </div>

            <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
              <h4 class="font-semibold text-slate-900 mb-2">🔟 Pronostic</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Variable selon forme et précocité du traitement</li>
                <li><strong>Facteurs de mauvais pronostic :</strong>
                  <ul class="list-disc list-inside ml-4 space-y-1">
                    <li>Début jeune (&lt;40 ans) avec formes progressive</li>
                    <li>Lésions médullaires initiales</li>
                    <li>Atteinte motrice sévère dès le départ</li>
                  </ul>
                </li>
                <li>Espérance de vie légèrement réduite, mais <strong>qualité de vie améliorée</strong> avec traitements modernes</li>
              </ul>
            </div>

            <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">🎯 Points clés pour neurologue / clinicien</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Diagnostic précoce</strong> : essentiel pour débuter traitement modificateur</li>
                <li><strong>IRM et LCR</strong> : piliers du diagnostic</li>
                <li><strong>Surveillance continue</strong> : suivi clinique et radiologique annuel</li>
                <li><strong>Prise en charge multidisciplinaire</strong> : neurologie, kinésithérapie, psychiatrie, rééducation</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C08A01", name: "Forme rémittente-décurrente" }, 
            { code: "C08A02", name: "Forme secondairement progressive" }, 
            { code: "C08A03", name: "Forme primaire progressive" }
          ] 
        },
        { 
          code: "C08B", 
          name: "Syndromes extra-pyramidaux", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-purple-800">🧬 SYNDROMES EXTRAPYRAMIDAUX (SEPX) – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
              <p class="text-sm mb-2">Les syndromes extrapyramidaux regroupent l'ensemble des <strong>troubles moteurs liés à une dysfonction du système extrapyramidal</strong>.</p>
              <p class="text-sm mb-2"><strong>Ce système comprend principalement :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Ganglions de la base</strong> : noyau caudé, putamen, globus pallidus, substance noire</li>
                <li><strong>Voies dopaminergiques nigro-striatales</strong></li>
              </ul>
              <p class="text-sm mt-2">⚠️ Ils se distinguent des troubles pyramidaux (motricité volontaire corticospinale).</p>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Physiopathologie</h4>
              <p class="text-sm mb-2"><strong>Déséquilibre dopaminergique / cholinergique</strong> au niveau des ganglions de la base</p>
              <p class="text-sm mb-2"><strong>Mécanismes principaux :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Perte neuronale dopaminergique</strong> (ex : maladie de Parkinson)</li>
                <li><strong>Blocage des récepteurs dopaminergiques</strong> (ex : neuroleptiques)</li>
                <li><strong>Atteintes cérébrales centrales</strong> (AVC, tumeurs, traumatismes)</li>
              </ul>
              <p class="text-sm mt-2"><strong>Conséquences</strong> : troubles du tonus musculaire, mouvements involontaires et lenteur motrice</p>
            </div>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Classification des syndromes extrapyramidaux</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-orange-800">A. Syndrome parkinsonien (hypokinétique)</h5>
                <p class="text-sm mb-1"><strong>Triade classique :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Bradykinésie / akinésie</strong> : ralentissement des mouvements</li>
                  <li><strong>Rigidité plastique</strong> : "roue dentée"</li>
                  <li><strong>Tremblement de repos</strong> : 4–6 Hz, unilatéral au début</li>
                </ul>
                <p class="text-sm mt-1 ml-2"><strong>Signes associés</strong> : posture voûtée, expression figée, micrographie</p>
                <p class="text-sm mt-2 ml-2"><strong>Causes :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Maladie de Parkinson idiopathique</li>
                  <li>Parkinson secondaire : médicaments, toxiques, infections, traumatismes</li>
                </ul>
              </div>

              <div class="mb-3">
                <h5 class="font-semibold text-orange-800">B. Syndromes hyperkinétiques</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Chorée</strong> : mouvements rapides, brusques, désordonnés
                    <br/><span class="ml-2 text-xs">Causes : Huntington, Sydenham, médicaments</span>
                  </li>
                  <li><strong>Atétose</strong> : mouvements lents, sinueux, distal des doigts
                    <br/><span class="ml-2 text-xs">Causes : paralysie cérébrale, dystonie cérébrale</span>
                  </li>
                  <li><strong>Ballisme / hémiballisme</strong> : mouvements amples, fléchisseurs/extenseurs, souvent unilatéraux
                    <br/><span class="ml-2 text-xs">Causes : lésion du noyau sous-thalamique (AVC)</span>
                  </li>
                  <li><strong>Dystonie</strong> : contractions musculaires prolongées → postures anormales
                    <br/><span class="ml-2 text-xs">Causes : primaire ou secondaire (médicaments, lésions cérébrales)</span>
                  </li>
                  <li><strong>Tics et myoclonies</strong> : mouvements rapides, brusques, répétitifs</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-orange-800">C. Syndromes mixtes</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Combinaison de symptômes hypo- et hyperkinétiques</li>
                  <li>Ex : Parkinsonisme tardif avec dystonie, choréoathétose</li>
                </ul>
              </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">4️⃣ Signes cliniques</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Troubles du mouvement</strong> : lenteur, tremblement, gestes involontaires</li>
                <li><strong>Troubles du tonus</strong> : rigidité plastique ou spastique</li>
                <li><strong>Troubles de la posture et de la marche</strong> : instabilité, festination, chute</li>
                <li><strong>Troubles du contrôle moteur fin</strong> : micrographie, hypomimie</li>
                <li><strong>Troubles secondaires</strong> : troubles cognitifs, dysautonomie</li>
              </ul>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">5️⃣ Examens complémentaires</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Imagerie cérébrale</strong> : IRM pour rechercher lésions structurales, AVC, tumeur</li>
                <li><strong>DatScan</strong> (scintigraphie dopaminergique) : exploration des voies nigro-striatales</li>
                <li><strong>Bilan biologique</strong> : rechercher causes secondaires (métabolique, toxique, infection)</li>
                <li><strong>Évaluation neuropsychologique</strong> : si troubles cognitifs associés</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">6️⃣ Causes principales</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Catégorie</th>
                    <th class="border border-gray-300 p-2 text-left">Exemples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Idiopathique</strong></td>
                    <td class="border border-gray-300 p-2">Maladie de Parkinson, chorée de Huntington</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Médicamenteuse / toxique</strong></td>
                    <td class="border border-gray-300 p-2">Neuroleptiques, antiémétiques (métoclopramide), cocaïne</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Vasculaire</strong></td>
                    <td class="border border-gray-300 p-2">AVC thalamique ou sous-thalamique</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Métabolique / endocrinien</strong></td>
                    <td class="border border-gray-300 p-2">Hypoglycémie, hyperthyroïdie, cirrhose</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Infectieux / inflammatoire</strong></td>
                    <td class="border border-gray-300 p-2">Encéphalite, lupus, VIH</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Génétique / congénital</strong></td>
                    <td class="border border-gray-300 p-2">Dystonie primaire, atétose post-natale</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">7️⃣ Traitement</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💊 A. Syndromes hypokinétiques</h5>
                <p class="text-sm ml-2 mb-1"><strong>Maladie de Parkinson :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                  <li><strong>L-dopa</strong> ± inhibiteurs de la dopa-décarboxylase</li>
                  <li><strong>Agonistes dopaminergiques</strong> (pramipexole, ropinirole)</li>
                  <li><strong>Inhibiteurs de la MAO-B</strong> (sélégiline, rasagiline)</li>
                  <li><strong>Rééducation fonctionnelle</strong> : kinésithérapie, orthophonie</li>
                </ul>
              </div>

              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💊 B. Syndromes hyperkinétiques</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Chorée</strong> : neuroleptiques atypiques (rispéridone, olanzapine), tetrabénazine</li>
                  <li><strong>Dystonie</strong> : anticholinergiques, toxine botulinique locale</li>
                  <li><strong>Ballisme</strong> : neuroleptiques, parfois chirurgie si sévère</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-cyan-800">💊 C. Causes secondaires</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Arrêt du médicament inducteur</strong> (ex : neuroleptique)</li>
                  <li><strong>Correction de la cause métabolique</strong> (hypoglycémie, déséquilibre électrolytique)</li>
                  <li><strong>Traitement chirurgical ou stimulant cérébral profond</strong> pour formes sévères et résistantes</li>
                </ul>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">8️⃣ Complications</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>⚠️ <strong>Chutes et traumatismes</strong></li>
                <li><strong>Troubles de la marche</strong> et autonomie réduite</li>
                <li><strong>Troubles cognitifs et psychiques secondaires</strong> (dépression, anxiété)</li>
                <li><strong>Dysautonomie</strong> (hypotension orthostatique, constipation, troubles urinaires)</li>
              </ul>
            </div>

            <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
              <h4 class="font-semibold text-slate-900 mb-2">9️⃣ Pronostic</h4>
              <p class="text-sm mb-2"><strong>Dépend de l'étiologie :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Idiopathique</strong> : progression lente (Parkinson)</li>
                <li><strong>Secondaire médicamenteuse</strong> : réversible si arrêt précoce</li>
                <li><strong>Génétique</strong> : souvent progressive et sévère</li>
              </ul>
              <p class="text-sm mt-2">✅ Traitement symptomatique améliore qualité de vie et autonomie</p>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">🔟 Points clés pour le clinicien</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🔑 <strong>Distinction hypokinétique vs hyperkinétique</strong> : clé pour diagnostic étiologique</li>
                <li>🔍 <strong>Recherche systématique des causes secondaires</strong> (médicaments, toxiques, métaboliques)</li>
                <li>🤝 <strong>Prise en charge multidisciplinaire</strong> : neurologie, kinésithérapie, ergothérapie, psychiatrie si nécessaire</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C08B01", name: "Maladie de Parkinson" }, 
            { code: "C08B02", name: "Syndrome parkinsonien secondaire" }, 
            { code: "C08B03", name: "Autres syndromes extrapyramidaux" }
          ] 
        },
        { code: "C08C", name: "Paralysies, hémiplégies", children: [{ code: "C08C01", name: "Hémiplégies" }, { code: "C08C02", name: "Paraplégies" }, { code: "C08C03", name: "Tétraplégies" }] },
        { 
          code: "C08D", 
          name: "Epilepsies", 
          children: [
            { 
              code: "C08D01", 
              name: "Epilepsie du lobe temporal",
              tooltip: `<div class="space-y-3">
          <h3 class="font-bold text-lg text-red-700">🧠 ÉPILEPSIE DU LOBE TEMPORAL (ELT)</h3>
          
          <div>
            <h4 class="font-semibold text-primary-600">🔹 1. Définition et Classification</h4>
            <p class="text-sm">L'ELT est une <strong>épilepsie focale</strong> dont la zone épileptogène se situe dans le lobe temporal. Elle se divise en deux sous-types anatomocliniques distincts :</p>
            
            <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-2 mb-2">
              <p class="text-sm font-semibold text-blue-800">📍 ELT Mésiale (Interne) :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Forme la plus courante (env. <strong>80% des cas</strong>)</li>
                <li>Implique les structures limbiques (hippocampe, amygdale, gyrus parahipocampique)</li>
                <li>Souvent associée à la <strong>Sclérose de l'Hippocampe</strong> (Sclérose Mésio-Temporale)</li>
              </ul>
            </div>
            
            <div class="bg-purple-50 border border-purple-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-purple-800">📍 ELT Latérale (Néocorticale) :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Implique le néocortex temporal externe</li>
                <li>Souvent liée à des <strong>lésions structurelles</strong> (dysplasie corticale, tumeurs, cavernomes) ou génétique</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-primary-600">🔹 2. Sémiologie Clinique (Symptômes)</h4>
            <p class="text-sm mb-2">La présentation clinique suit généralement une séquence stéréotypée :</p>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-yellow-900">A. L'Aura (Crise focale sans rupture de contact)</p>
              <p class="text-xs text-yellow-700 mb-2">⚡ C'est le signe localisateur le plus fiable</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Sensation épigastrique ascendante</strong> : Le symptôme le plus fréquent de l'ELT mésiale</li>
                <li><strong>Phénomènes psychiques/mnésiques</strong> : Impression de "déjà-vu" ou "jamais-vu", états de rêve</li>
                <li><strong>Hallucinations olfactives ou gustatives</strong> : Souvent désagréables (odeur de brûlé), typique de l'atteinte de l'uncus (crises uncinées)</li>
                <li><strong>Peur soudaine</strong> : Activation de l'amygdale</li>
              </ul>
            </div>
            
            <div class="bg-orange-50 border border-orange-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-orange-900">B. Phase Ictale (Rupture de contact)</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Arrêt comportemental</strong> : "Staring spell" (fixité du regard)</li>
                <li><strong>Automatismes oro-alimentaires</strong> : Mâchonnement, déglutition, claquement de lèvres</li>
                <li><strong>Automatismes gestuels</strong> : Grattage, manipulation d'objets (souvent ipsilatéral au foyer)</li>
                <li><strong>Dystonie du membre supérieur</strong> : Souvent controlatérale au foyer épileptogène (signe localisateur important)</li>
              </ul>
            </div>
            
            <div class="bg-gray-50 border border-gray-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-gray-900">C. Phase Post-Ictale</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Confusion mentale progressive</li>
                <li><strong>Aphasie</strong> : Suggère fortement une atteinte de l'hémisphère dominant (généralement gauche)</li>
                <li>Fatigue, céphalées</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-primary-600">🔹 3. Diagnostic Paraclinique</h4>
            
            <div class="bg-teal-50 border border-teal-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-teal-900">A. Électroencéphalogramme (EEG)</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Intercritique</strong> (entre les crises) : Pointes ou ondes aiguës dans les régions temporales antérieures (électrodes F7/F8, T3/T4) ou basales</li>
                <li>⚠️ L'EEG peut être normal dans 30 à 40% des cas de surface</li>
                <li><strong>Vidéo-EEG (Gold Standard)</strong> : Indispensable pour corréler la clinique et l'activité électrique, surtout en pré-chirurgical</li>
              </ul>
            </div>
            
            <div class="bg-indigo-50 border border-indigo-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-indigo-900">B. Imagerie par Résonance Magnétique (IRM)</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Protocole épilepsie haute résolution (<strong>3 Tesla</strong>) requis</li>
                <li><strong>Recherche de Sclérose de l'Hippocampe</strong> : Atrophie hippocampique et hypersignal en séquence T2/FLAIR</li>
                <li><strong>Recherche de lésions</strong> : Tumeurs de bas grade (DNET, gangliogliome), dysplasies corticales focales</li>
              </ul>
            </div>
            
            <div class="bg-pink-50 border border-pink-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-pink-900">C. Neuropsychologie</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Mise en évidence de déficits mnésiques</li>
                <li><strong>Mémoire verbale</strong> : Pour le lobe dominant</li>
                <li><strong>Mémoire visuo-spatiale</strong> : Pour le lobe non-dominant</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-primary-600">🔹 4. Prise en Charge Thérapeutique</h4>
            
            <div class="bg-green-50 border border-green-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-green-900">A. Traitement Pharmacologique</p>
              <p class="text-xs text-green-700 mb-2">Le traitement vise la suppression des crises (monothérapie privilégiée)</p>
              
              <p class="text-sm font-semibold mt-2">💊 Molécules de 1ère ligne :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Lamotrigine</strong></li>
                <li><strong>Lévétiracétam</strong></li>
                <li><strong>Carbamazépine</strong> (attention aux interactions enzymatiques)</li>
                <li><strong>Oxcarbazépine</strong></li>
              </ul>
              
              <p class="text-sm font-semibold mt-2">💊 Molécules de 2ème ligne :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li>Lacosamide</li>
                <li>Topiramate</li>
                <li>Zonisamide</li>
                <li>Perampanel</li>
              </ul>
              
              <div class="bg-yellow-100 border border-yellow-300 rounded p-2 mt-2">
                <p class="text-xs font-semibold text-yellow-800">⚠️ Note importante :</p>
                <p class="text-xs text-yellow-700">Environ <strong>30% à 40%</strong> des ELT sont pharmaco-résistantes (échec de deux molécules bien conduites)</p>
              </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-2">
              <p class="text-sm font-semibold text-blue-900">B. Traitement Chirurgical</p>
              <div class="bg-blue-100 border border-blue-300 rounded p-2 mb-2">
                <p class="text-xs font-semibold text-blue-800">🎯 L'ELT est la forme d'épilepsie qui répond le mieux à la chirurgie</p>
                <p class="text-xs text-blue-700">Elle doit être envisagée rapidement en cas de pharmaco-résistance avérée</p>
              </div>
              
              <p class="text-sm font-semibold mt-2">🔪 Procédures :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>Lobectomie temporale antérieure</strong></li>
                <li><strong>Amygdalo-hippocampectomie sélective</strong></li>
              </ul>
              
              <p class="text-sm font-semibold mt-2">✅ Résultats :</p>
              <ul class="text-sm list-disc list-inside ml-2">
                <li><strong>60% à 80%</strong> des patients deviennent libres de crises (Classification Engel I)</li>
              </ul>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded p-3">
            <h4 class="font-semibold text-red-900">⚡ Points clés pour le médecin</h4>
            <ul class="text-sm list-disc list-inside ml-2">
              <li>🔑 L'aura est le <strong>signe localisateur le plus fiable</strong></li>
              <li>🧠 Vidéo-EEG et IRM 3T sont <strong>indispensables</strong> au diagnostic</li>
              <li>💊 30-40% de pharmaco-résistance → <strong>chirurgie à envisager précocement</strong></li>
              <li>✅ Excellent pronostic chirurgical : 60-80% de guérison</li>
              <li>🎯 Traitement précoce essentiel pour éviter complications cognitives et sociales</li>
            </ul>
          </div>
        </div>`
            }, 
            { 
              code: "C08D02", 
              name: "Epilepsie myoclonique progressive",
              tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-purple-700">🧠 ÉPILEPSIE MYOCLONIQUE PROGRESSIVE (EMP)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET CONCEPT</h4>
          <p class="mb-2"><strong>Syndrome clinique hétérogène</strong> - Pas une maladie unique, mais une association de :</p>
          
          <div class="bg-white p-2 rounded mt-2">
            <p class="font-semibold text-purple-700 mb-1">🔺 Triade Clinique Classique :</p>
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Myoclonies</strong> : Fragmentaires, migratrices, multifocales
                <ul class="list-circle ml-4 text-sm">
                  <li>Aggravées par mouvement, stress, stimuli sensoriels (bruit, lumière, toucher)</li>
                  <li>Souvent invalidantes</li>
                </ul>
              </li>
              <li><strong>Épilepsie</strong> : CTCG (crises tonico-cloniques généralisées), absences ou crises toniques</li>
              <li><strong>Détérioration Neurologique</strong> :
                <ul class="list-circle ml-4 text-sm">
                  <li>Déclin cognitif (démence progressive)</li>
                  <li>Ataxie cérébelleuse (troubles équilibre)</li>
                  <li>Troubles visuels</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ ÉTIOLOGIES PRINCIPALES (Diagnostic Différentiel)</h4>
          <p class="text-sm italic mb-2">⚠️ Détermination cruciale pour pronostic et conseil génétique</p>
          
          <div class="bg-white p-2 rounded text-sm">
            <table class="w-full">
              <thead class="bg-purple-100">
                <tr>
                  <th class="text-left p-1 border">Maladie</th>
                  <th class="text-left p-1 border">Gène / Cause</th>
                  <th class="text-left p-1 border">Caractéristiques</th>
                  <th class="text-left p-1 border">Pronostic</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-1 border"><strong>Unverricht-Lundborg (EPM1)</strong></td>
                  <td class="p-1 border">CSTB (Cystatine B)</td>
                  <td class="p-1 border">Début 6-15 ans. Myoclonies action. Ataxie. Intellect préservé longtemps</td>
                  <td class="p-1 border text-green-700">Lente. Espérance vie quasi normale</td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border"><strong>Lafora (EPM2)</strong></td>
                  <td class="p-1 border">EPM2A / NHLRC1</td>
                  <td class="p-1 border">Début 10-18 ans. Hallucinations visuelles précoces. Démence rapide. Corps Lafora biopsie</td>
                  <td class="p-1 border text-red-700"><strong>Sévère. Décès 2-10 ans</strong></td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border"><strong>NCL (Céroïde-Lipofuscinose)</strong></td>
                  <td class="p-1 border">Gènes CLN (CLN3)</td>
                  <td class="p-1 border">Troubles visuels précoces (baisse acuité, rétinite). Démence</td>
                  <td class="p-1 border">Variable (infantile → adulte)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border"><strong>Sialidose Type I</strong></td>
                  <td class="p-1 border">Déficit neuraminidase</td>
                  <td class="p-1 border">Tache rouge cerise fond d'œil. Myoclonies massives. Pas démence</td>
                  <td class="p-1 border">Variable</td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border"><strong>MERRF (Mitochondrial)</strong></td>
                  <td class="p-1 border">ADNmt (tRNALys)</td>
                  <td class="p-1 border">"Ragged Red Fibers". Surdité, petite taille, lipomes, acidose lactique</td>
                  <td class="p-1 border">Très variable</td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border"><strong>Gaucher Type 3</strong></td>
                  <td class="p-1 border">GBA</td>
                  <td class="p-1 border">Splénomégalie, hépatomégalie, paralysie oculomotrice</td>
                  <td class="p-1 border text-green-700">Traitable enzymothérapie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ DÉMARCHE DIAGNOSTIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700">A. Électroencéphalogramme (EEG)</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Fond</strong> : Ralentissement rythme de fond (≠ JME où fond normal)</li>
                <li><strong>Anomalies</strong> : Polypointes-ondes généralisées, bouffées pointes-ondes rapides</li>
                <li><strong>Photosensibilité</strong> : Souvent très marquée</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700">B. Examens Biologiques et Génétique</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Biologie standard</strong> : Lactates (MERRF), frottis sanguin (vacuoles pour NCL)</li>
                <li><strong>Génétique (Standard actuel)</strong> : Panel séquençage NGS "Épilepsies myocloniques progressives"</li>
                <li><strong>Biopsies</strong> (si génétique non conclusive) :
                  <ul class="list-circle ml-4">
                    <li><strong>Peau (axillaire)</strong> : Corps de Lafora (PAS+) ou inclusions NCL</li>
                    <li><strong>Muscle</strong> : Ragged Red Fibers (MERRF)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-orange-700">C. Ophtalmologie</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Fond d'œil</strong> : Tache rouge cerise (Sialidose) ou atrophie optique/rétinite (NCL)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">4️⃣ PRISE EN CHARGE THÉRAPEUTIQUE</h4>
          <p class="text-sm italic mb-2">⚠️ Traitement symptomatique - Pas de curatif pour la majorité des EMP</p>
          
          <div class="space-y-2">
            <div class="bg-green-50 p-2 rounded">
              <p class="font-semibold text-green-800 mb-1">✅ A. Molécules RECOMMANDÉES (Anti-Myocloniques)</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Valproate de Sodium (VPA)</strong> : 1ère intention (large spectre)</li>
                <li><strong>Clonazépam (Rivotril)</strong> : Très efficace myoclonies (⚠️ sédation, tolérance)</li>
                <li><strong>Lévétiracétam (Keppra)</strong> : Efficace myoclonies corticales</li>
                <li><strong>Piracetam (Nootropyl)</strong> : Haute dose (jusqu'à 20g/j) pour myoclonies action sévères</li>
                <li><strong>Zonisamide / Topiramate</strong> : En appoint</li>
              </ul>
            </div>

            <div class="bg-red-50 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 mb-1">⛔ B. Médicaments CONTRE-INDIQUÉS</p>
              <p class="text-sm text-red-700 mb-2"><strong>⚠️ AGGRAVATION myoclonies et ataxie :</strong></p>
              <ul class="list-disc ml-5 text-sm text-red-700">
                <li><strong>Phénytoïne</strong></li>
                <li><strong>Carbamazépine</strong></li>
                <li><strong>Oxcarbazépine</strong></li>
                <li><strong>Vigabatrin</strong></li>
                <li><strong>Gabapentine / Prégabaline</strong> (inefficaces ou aggravants)</li>
                <li><strong>Lamotrigine</strong> : Extrême prudence (aggrave Unverricht-Lundborg)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 SYNTHÈSE POUR LA PRATIQUE</h4>
          <div class="bg-red-100 p-2 rounded border border-red-400">
            <p class="text-sm"><strong>⚠️ Point de Vigilance Critique :</strong></p>
            <p class="text-sm mt-1">Tout patient diagnostiqué <strong>"Épilepsie Myoclonique Juvénile" (JME)</strong> qui devient :</p>
            <ul class="list-disc ml-5 text-sm mt-1">
              <li>Résistant au traitement</li>
              <li>Développe troubles cognitifs</li>
              <li>Développe troubles de l'équilibre</li>
            </ul>
            <p class="text-sm mt-2 font-bold text-red-700">➡️ Doit être RÉÉVALUÉ pour une EMP</p>
          </div>
        </div>
      </div>`
            }, 
            { 
              code: "C08D03", 
              name: "Epilepsie post-traumatique",
              tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-indigo-700">🧠 ÉPILEPSIE POST-TRAUMATIQUE (EPT)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITIONS ET CLASSIFICATION TEMPORELLE</h4>
          <p class="text-sm mb-2 italic">⚠️ Fondamental : Distinguer selon le délai d'apparition par rapport au Traumatisme Crânien (TC)</p>
          
          <div class="space-y-2">
            <div class="bg-gray-100 p-2 rounded">
              <p class="font-semibold text-gray-700">⚡ Crises Immédiates (Impact seizures) : <span class="text-red-600">&lt; 24h</span></p>
              <ul class="list-disc ml-5 text-sm">
                <li>Souvent réflexes</li>
                <li><strong>Non prédictives d'épilepsie future</strong></li>
              </ul>
            </div>

            <div class="bg-yellow-100 p-2 rounded">
              <p class="font-semibold text-yellow-800">⚠️ Crises Précoces (Early seizures) : <span class="text-orange-600">&lt; 7 jours</span></p>
              <ul class="list-disc ml-5 text-sm">
                <li>Considérées comme <strong>crises symptomatiques aiguës</strong> (provoquées)</li>
                <li>Témoignent de la souffrance cérébrale aiguë : œdème, hémorragie, excitotoxicité</li>
              </ul>
            </div>

            <div class="bg-red-100 p-2 rounded border border-red-400">
              <p class="font-semibold text-red-800">🔴 Crises Tardives (Late seizures) : <span class="text-red-700">&gt; 7 jours</span></p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>UNE SEULE crise tardive suffit pour poser le diagnostic EPT</strong></li>
                <li>Risque récidive <strong>&gt; 80%</strong> (critère ILAE)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ ÉPIDÉMIOLOGIE ET STRATIFICATION DU RISQUE</h4>
          <p class="text-sm italic mb-2">📊 Incidence EPT corrélée à la sévérité (Classification d'Annegers)</p>
          
          <div class="bg-white p-2 rounded text-sm">
            <table class="w-full">
              <thead class="bg-purple-100">
                <tr>
                  <th class="text-left p-1 border">Sévérité TC</th>
                  <th class="text-left p-1 border">Critères Cliniques/Radiologiques</th>
                  <th class="text-left p-1 border">Risque EPT à 5 ans</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-green-50">
                  <td class="p-1 border"><strong>Léger</strong></td>
                  <td class="p-1 border">Pas de fracture, amnésie/PC &lt; 30 min</td>
                  <td class="p-1 border text-green-700"><strong>~ 0.7%</strong> (proche pop. générale)</td>
                </tr>
                <tr class="border-b bg-yellow-50">
                  <td class="p-1 border"><strong>Modéré</strong></td>
                  <td class="p-1 border">Fracture crâne linéaire OU amnésie/PC 30 min - 24h</td>
                  <td class="p-1 border text-orange-600"><strong>1.0 - 2.0%</strong></td>
                </tr>
                <tr class="border-b bg-red-50">
                  <td class="p-1 border"><strong>Sévère</strong></td>
                  <td class="p-1 border">Contusion cérébrale, hématome (sous-dural/intracérébral), embarrure, amnésie/PC &gt; 24h</td>
                  <td class="p-1 border text-red-700"><strong>&gt; 15 - 30%</strong></td>
                </tr>
              </tbody>
            </table>
            <p class="mt-2 text-xs italic">⚠️ <strong>Plaies pénétrantes</strong> (balles, éclats) : risque <strong>&gt; 50%</strong></p>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">3️⃣ PHYSIOPATHOLOGIE (Épileptogenèse)</h4>
          <p class="text-sm mb-2">⏱️ <strong>Période silencieuse</strong> (latence) entre traumatisme et 1ère crise tardive : réorganisation réseaux neuronaux</p>
          
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li><strong>Dépôts d'Hémosidérine</strong> : Fer issu hémolyse (hématomes) = puissant agent épileptogène
                <ul class="list-circle ml-4">
                  <li>Radicaux libres, péroxydation lipidique</li>
                </ul>
              </li>
              <li><strong>Gliose réactionnelle</strong> : Cicatrices gliales perturbant connexions synaptiques</li>
              <li><strong>Excitotoxicité</strong> : Relargage massif de Glutamate</li>
            </ul>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">4️⃣ PROPHYLAXIE (Prévention) : LE CONSENSUS ACTUEL</h4>
          <p class="text-sm italic mb-2">⚠️ Point de confusion le plus fréquent - Recommandations AAN / Brain Trauma Foundation</p>
          
          <div class="space-y-2">
            <div class="bg-green-50 p-2 rounded border-2 border-green-500">
              <p class="font-semibold text-green-800 mb-1">✅ RÈGLE D'OR N°1</p>
              <p class="text-sm"><strong>Prophylaxie des crises PRÉCOCES (&lt; 7 jours)</strong> : <span class="text-green-700 font-bold">OUI</span></p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Indiquée</strong> en cas de TC sévère</li>
                <li>Objectif : Éviter aggravation lésions secondaires (HTIC, hypoxie)</li>
                <li><strong>Molécule</strong> : Lévétiracétam (ou Phénytoïne)</li>
              </ul>
            </div>

            <div class="bg-red-50 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 mb-1">⛔ RÈGLE D'OR N°2</p>
              <p class="text-sm"><strong>Prophylaxie de l'épilepsie TARDIVE (au long cours)</strong> : <span class="text-red-700 font-bold">NON</span></p>
              <ul class="list-disc ml-5 text-sm text-red-700">
                <li><strong>Aucune étude</strong> n'a démontré qu'un traitement préventif bloque l'épileptogenèse</li>
                <li>❌ On ne traite PAS "au cas où" après J7</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">5️⃣ DIAGNOSTIC ET BILAN</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700">A. Clinique</p>
              <ul class="list-disc ml-5 text-sm">
                <li>Crises <strong>majoritairement focales</strong> (± altération conscience)</li>
                <li>Reflètent localisation lésion (souvent <strong>frontale ou temporale</strong>)</li>
                <li>Peuvent généraliser secondairement (CTCB - Tonico-Cloniques Bilatérales)</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700">B. Imagerie (IRM Cérébrale)</p>
              <p class="text-sm italic">📡 Examen de référence à distance du traumatisme</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Séquence clé</strong> : T2* (Gradient Écho) ou <strong>SWI</strong> (Susceptibility Weighted Imaging)</li>
                <li><strong>Objectif</strong> :
                  <ul class="list-circle ml-4">
                    <li>Visualiser <strong>dépôts d'hémosidérine</strong> (hyposignaux noirs = traces anciennes contusions/saignements)</li>
                    <li>Rechercher cicatrices cortico-sous-corticales (gliose)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-orange-700">C. EEG</p>
              <ul class="list-disc ml-5 text-sm">
                <li>Souvent <strong>normal en intercritique</strong></li>
                <li>Utile pour caractériser le foyer si anomalies présentes</li>
                <li><strong>Indispensable</strong> si doute sur état de mal non convulsif (confusion persistante)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ PRISE EN CHARGE THÉRAPEUTIQUE (Curative)</h4>
          <p class="text-sm italic mb-2">💊 Traitement de fond instauré dès la <strong>1ère crise tardive (&gt; J7)</strong></p>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">A. Choix de la Molécule</p>
              <p class="text-xs italic mb-2">Pas de supériorité nette - Choix selon effets secondaires et comorbidités</p>
              
              <ul class="list-disc ml-5 text-sm space-y-1">
                <li><strong>Lévétiracétam (Keppra)</strong> : Souvent 1er choix
                  <ul class="list-circle ml-4 text-xs">
                    <li>✅ Pas d'induction enzymatique, titrage rapide</li>
                    <li>⚠️ Effets psychiatriques fréquents (irritabilité) chez traumatisés crâniens</li>
                  </ul>
                </li>
                <li><strong>Lamotrigine (Lamictal)</strong> : Très bon profil
                  <ul class="list-circle ml-4 text-xs">
                    <li>✅ Excellent profil cognitif et thymique (stabilisateur humeur)</li>
                    <li>⚠️ Titrage lent</li>
                  </ul>
                </li>
                <li><strong>Carbamazépine / Oxcarbazépine</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>✅ Efficaces</li>
                    <li>⚠️ Inducteurs enzymatiques, effets cognitifs (somnolence, vertiges)</li>
                  </ul>
                </li>
                <li><strong>Valproate (Dépakine)</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>✅ Efficace</li>
                    <li>⚠️ Tremblements, prise de poids</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-blue-50 p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">B. Pronostic</p>
              <ul class="list-disc ml-5 text-sm">
                <li>✅ <strong>Rémission possible</strong> : ~ 50% des patients</li>
                <li>⚠️ <strong>Pharmacorésistance</strong> : ~ 30%</li>
                <li>🔄 <strong>Sevrage</strong> envisageable après 2 ans sans crise
                  <ul class="list-circle ml-4 text-xs">
                    <li>Mais risque rechute > épilepsies idiopathiques</li>
                    <li>Surtout si lésion IRM persiste</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>📅 <strong>&lt; 7 jours</strong> : Prophylaxie OUI (TC sévère)</li>
              <li>📅 <strong>&gt; 7 jours</strong> : Traitement au long cours NON (sauf si crise)</li>
              <li>🔴 <strong>1 seule crise tardive = EPT</strong> (récidive 80%)</li>
              <li>🧲 <strong>IRM T2*/SWI</strong> : Visualiser hémosidérine (épileptogène)</li>
              <li>💊 <strong>Lévétiracétam ou Lamotrigine</strong> : Choix fréquents</li>
              <li>📊 <strong>Pronostic</strong> : 50% rémission, 30% résistance</li>
            </ul>
          </div>
        </div>
      </div>`
            }
          ]
        }
    ],
  },
  {
    code: "C09",
    name: "Maladies musculaires ou neuromusculaires",
    children: [
      { 
        code: "C09A", 
        name: "Polynevrites",
        tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-indigo-700">🦵 POLYNÉVRITES (POLYNEUROPATHIES PÉRIPHÉRIQUES)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET CARACTÉRISTIQUES CLÉS</h4>
          <p class="text-sm mb-2"><strong>Atteinte généralisée du système nerveux périphérique</strong></p>
          
          <div class="bg-white p-2 rounded">
            <p class="font-semibold text-purple-700 mb-1">🔺 TRIADE DIAGNOSTIQUE :</p>
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li><strong>Symétrie</strong> : Atteinte bilatérale</li>
              <li><strong>Distalité</strong> : Début aux extrémités des membres inférieurs
                <ul class="list-circle ml-4 text-xs">
                  <li>"Longueur-dépendante" : fibres les plus longues touchées en premier</li>
                </ul>
              </li>
              <li><strong>Synchronisme</strong> : Évolution progressive et simultanée (≠ multinévrite)</li>
            </ul>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ PHYSIOPATHOLOGIE</h4>
          <p class="text-sm italic mb-2">⚡ <strong>ENMG</strong> (Électroneuromyogramme) permet la différenciation</p>
          
          <div class="bg-white p-2 rounded text-sm">
            <table class="w-full">
              <thead class="bg-purple-100">
                <tr>
                  <th class="text-left p-1 border">Type</th>
                  <th class="text-left p-1 border">Mécanisme</th>
                  <th class="text-left p-1 border">ENMG</th>
                  <th class="text-left p-1 border">Causes Principales</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-yellow-50">
                  <td class="p-1 border"><strong>Axonal</strong><br/>(80% cas)</td>
                  <td class="p-1 border">Dégénérescence axone (Wallérienne)</td>
                  <td class="p-1 border text-red-700"><strong>Amplitude ↓</strong><br/>Vitesse normale</td>
                  <td class="p-1 border">Toxiques, Métaboliques</td>
                </tr>
                <tr class="border-b bg-blue-50">
                  <td class="p-1 border"><strong>Démyélinisant</strong></td>
                  <td class="p-1 border">Atteinte gaine myéline (Schwann)</td>
                  <td class="p-1 border text-blue-700"><strong>Vitesse ↓</strong><br/>(&lt;38 m/s MS)</td>
                  <td class="p-1 border">Génétiques, Dysimmunitaires</td>
                </tr>
                <tr class="border-b bg-pink-50">
                  <td class="p-1 border"><strong>Neuronopathie</strong></td>
                  <td class="p-1 border">Atteinte corps cellulaire (ganglion spinal)</td>
                  <td class="p-1 border">Sensitive pure, ataxique<br/><strong>Non longueur-dépendante</strong></td>
                  <td class="p-1 border">Paranéoplasique, Gougerot-Sjögren</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ SÉMIOLOGIE CLINIQUE</h4>
          <p class="text-sm italic mb-2">⏱️ Installation généralement progressive (mois/années)</p>
          
          <div class="space-y-2">
            <div class="bg-orange-50 p-2 rounded">
              <p class="font-semibold text-orange-700 mb-1">A. Signes Sensitifs (INAUGURAUX)</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Subjectifs</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Paresthésies (fourmillements, picotements)</li>
                    <li>Dysesthésies (brûlures, froid douloureux, décharges)</li>
                  </ul>
                </li>
                <li><strong>Topographie</strong> : En <strong>"chaussettes"</strong> → remonte vers genoux → atteint mains (en <strong>"gants"</strong>)</li>
                <li><strong>Objectifs</strong> : Hypoesthésie tactile, thermo-algique ou pallesthésique (diapason)</li>
              </ul>
            </div>

            <div class="bg-red-50 p-2 rounded">
              <p class="font-semibold text-red-700 mb-1">B. Signes Moteurs (SECONDAIRES)</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Déficit moteur distal</strong> : Releveurs du pied (Jambier antérieur) → <strong>Steppage</strong> à la marche</li>
                <li>Difficulté à marcher sur les talons</li>
                <li>Crampes nocturnes</li>
                <li>Amyotrophie (fonte musculaire) tardive</li>
              </ul>
            </div>

            <div class="bg-green-50 p-2 rounded">
              <p class="font-semibold text-green-700 mb-1">C. Réflexes</p>
              <ul class="list-disc ml-5 text-sm">
                <li>❌ <strong>Abolition réflexes achilléens</strong> (signe précoce et quasi constant)</li>
                <li>✅ Conservation réflexes rotuliens (tant que l'atteinte ne remonte pas)</li>
              </ul>
            </div>

            <div class="bg-gray-50 p-2 rounded">
              <p class="font-semibold text-gray-700 mb-1">D. Troubles Trophiques</p>
              <ul class="list-disc ml-5 text-sm">
                <li>Peau sèche, dépilation</li>
                <li>Maux perforants plantaires (surtout diabète)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">4️⃣ DIAGNOSTIC PARACLINIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">A. Électroneuromyogramme (ENMG)</p>
              <p class="text-xs italic mb-1">⚡ Examen indispensable pour confirmer diagnostic et typer atteinte</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Forme Axonale</strong> : Vitesses normales, <strong>Amplitudes diminuées</strong></li>
                <li><strong>Forme Démyélinisante</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li><strong>Vitesses ralenties</strong> (&lt; 38 m/s au MS)</li>
                    <li>Allongement latences distales</li>
                    <li>Blocs de conduction</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700 mb-1">B. Bilan Biologique de 1ère Intention</p>
              <p class="text-xs italic mb-1">Face à une polyneuropathie axonale symétrique distale :</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Diabète</strong> : Glycémie à jeun, HbA1c (Cause #1)</li>
                <li><strong>Alcool/Carence</strong> : NFS (macrocytose), GGT, CDT, Vitamine B12, Folates (B9)</li>
                <li><strong>Rénal/Hépatique</strong> : Créatinine, Transaminases</li>
                <li><strong>Thyroïde</strong> : TSH</li>
                <li><strong>Dysglobulinémie</strong> : Électrophorèse protéines sériques (Pic monoclonal?)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ ÉTIOLOGIES (Les Causes)</h4>
          <p class="text-sm italic mb-2">📊 Mnémotechnique : <strong>DANG THERAPIST</strong></p>
          
          <div class="bg-white p-2 rounded text-sm">
            <table class="w-full">
              <thead class="bg-orange-100">
                <tr>
                  <th class="text-left p-1 border">Catégorie</th>
                  <th class="text-left p-1 border">Causes Principales</th>
                  <th class="text-left p-1 border">Remarques</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-red-50">
                  <td class="p-1 border"><strong>Métaboliques</strong></td>
                  <td class="p-1 border"><strong>Diabète</strong> (30-50%), IRC, Hypothyroïdie</td>
                  <td class="p-1 border">Neuropathie diabétique souvent mixte et douloureuse</td>
                </tr>
                <tr class="border-b bg-purple-50">
                  <td class="p-1 border"><strong>Toxiques</strong></td>
                  <td class="p-1 border">Alcool (+ carence B1), Chimio (Platines, Taxanes, Vincristine), Isoniazide, Amiodarone, Toxiques pro (Plomb, Arsenic)</td>
                  <td class="p-1 border">Arrêt toxique stabilise, récupération lente/incomplète</td>
                </tr>
                <tr class="border-b bg-yellow-50">
                  <td class="p-1 border"><strong>Carentielles</strong></td>
                  <td class="p-1 border">Vit B12 (Biermer, végétaliens), B1 (Béri-béri), B6</td>
                  <td class="p-1 border">⚠️ Post-chirurgie bariatrique</td>
                </tr>
                <tr class="border-b bg-blue-50">
                  <td class="p-1 border"><strong>Infectieuses</strong></td>
                  <td class="p-1 border">VIH (stade avancé), Hépatite C (cryoglobulinémie), Lyme (tertiaire)</td>
                  <td class="p-1 border">-</td>
                </tr>
                <tr class="border-b bg-pink-50">
                  <td class="p-1 border"><strong>Inflammatoires</strong></td>
                  <td class="p-1 border">Vascularites (asymétriques début), Sarcoïdose, Gammapathies (IgM anti-MAG)</td>
                  <td class="p-1 border">-</td>
                </tr>
                <tr class="border-b bg-green-50">
                  <td class="p-1 border"><strong>Héréditaires</strong></td>
                  <td class="p-1 border">Charcot-Marie-Tooth (CMT)</td>
                  <td class="p-1 border">Pieds creux, ATCD familiaux, évolution très lente depuis enfance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ PRISE EN CHARGE THÉRAPEUTIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 mb-1">A. Traitement Étiologique (PRIORITÉ)</p>
              <ul class="list-disc ml-5 text-sm">
                <li>Équilibre glycémique (diabète)</li>
                <li>Sevrage alcoolique</li>
                <li>Supplémentation vitaminique</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-red-700 mb-1">B. Traitement Symptomatique (Douleurs Neuropathiques)</p>
              <p class="text-xs text-red-600 italic mb-1">⚠️ Antalgiques classiques (Paracétamol, AINS) <strong>INEFFICACES</strong></p>
              
              <p class="text-xs font-semibold mt-2 mb-1">💊 Co-analgésiques à utiliser :</p>
              <ul class="list-disc ml-5 text-sm space-y-1">
                <li><strong>Antiépileptiques</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Prégabaline (Lyrica)</li>
                    <li>Gabapentine (Neurontin)</li>
                  </ul>
                </li>
                <li><strong>Antidépresseurs</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Tricycliques : Amitriptyline (Laroxyl)</li>
                    <li>IRSNA : Duloxétine (Cymbalta)</li>
                  </ul>
                </li>
                <li><strong>Topiques</strong> (zones localisées) :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Emplâtres Versatis (Lidocaïne)</li>
                    <li>Capsaïcine (Qutenza)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-yellow-50 p-2 rounded">
              <p class="font-semibold text-yellow-800 mb-1">C. Rééducation</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Kinésithérapie motrice</strong> : Lutte contre rétraction, releveurs</li>
                <li><strong>Orthèses</strong> : Releveurs de pied si steppage</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🔺 <strong>Triade</strong> : Symétrie + Distalité + Synchronisme</li>
              <li>📍 <strong>Topographie</strong> : "Chaussettes" → "Gants"</li>
              <li>⚡ <strong>ENMG</strong> indispensable : Typer atteinte (axonal vs démyélinisant)</li>
              <li>🔬 <strong>Cause #1</strong> : Diabète (30-50%)</li>
              <li>❌ <strong>ROT achilléens abolis</strong> = signe précoce constant</li>
              <li>💊 <strong>Douleurs neuropathiques</strong> : Prégabaline, Duloxétine, Amitriptyline</li>
              <li>🎯 <strong>Priorité</strong> : Traitement étiologique (équilibre diabète, sevrage alcool, vitamines)</li>
            </ul>
          </div>
        </div>
      </div>`,
        children: [
          { code: "C09A01", name: "Polynévrite inflammatoires" }, 
          { code: "C09A02", name: "Polynévrite diabétique" }, 
          { code: "C09A03", name: "Autres polynévrites" }
        ] 
      }
    ],
  },
  {
    code: "C10",
    name: "Les encéphalopathies",
    children: [
      { 
        code: "C10A", 
        name: "Affections dégénératives", 
        tooltip: `<div class="space-y-3">
          <h3 class="text-lg font-bold text-indigo-800">🧠 ENCÉPHALOPATHIES DÉGÉNÉRATIVES – FICHE SYNTHÉTIQUE</h3>
          
          <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
            <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
            <p class="text-sm mb-2">Les encéphalopathies dégénératives regroupent les <strong>maladies neurologiques chroniques</strong> caractérisées par :</p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Perte progressive de neurones et de synapses</strong></li>
              <li><strong>Atteinte fonctionnelle cérébrale diffuse ou focale</strong></li>
              <li><strong>Absence de cause inflammatoire, infectieuse ou vasculaire claire</strong></li>
            </ul>
            <p class="text-sm mt-2">⚠️ Elles entraînent progressivement <strong>déficits cognitifs, moteurs et comportementaux</strong>.</p>
          </div>

          <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
            <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Physiopathologie générale</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Accumulation de protéines anormales</strong> (ex : β-amyloïde, tau, α-synucléine)</li>
              <li><strong>Dysfonction mitochondriale et stress oxydatif</strong></li>
              <li><strong>Inflammation microgliale chronique</strong></li>
              <li><strong>Perte synaptique et atrophie neuronale</strong></li>
              <li>Différenciation selon région cérébrale touchée : cortex, ganglions de la base, cervelet, substance noire</li>
            </ul>
          </div>

          <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
            <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Principales encéphalopathies dégénératives</h4>
            <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-300 p-2 text-left">Maladie</th>
                  <th class="border border-gray-300 p-2 text-left">Âge typique</th>
                  <th class="border border-gray-300 p-2 text-left">Atteintes principales</th>
                  <th class="border border-gray-300 p-2 text-left">Signes cliniques</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 p-2"><strong>Maladie d'Alzheimer (MA)</strong></td>
                  <td class="border border-gray-300 p-2">&gt;65 ans (forme sporadique)</td>
                  <td class="border border-gray-300 p-2">Cortex associatif, hippocampe</td>
                  <td class="border border-gray-300 p-2">Troubles mnésiques progressifs, désorientation, troubles du langage, apraxie, agnosie</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 p-2"><strong>Démence à corps de Lewy (DCL)</strong></td>
                  <td class="border border-gray-300 p-2">60–80 ans</td>
                  <td class="border border-gray-300 p-2">Cortex, ganglions basaux</td>
                  <td class="border border-gray-300 p-2">Troubles cognitifs fluctuants, hallucinations visuelles, parkinsonisme</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2"><strong>Maladie de Parkinson avec démence (PDD)</strong></td>
                  <td class="border border-gray-300 p-2">60–80 ans</td>
                  <td class="border border-gray-300 p-2">Substance noire, cortex</td>
                  <td class="border border-gray-300 p-2">Parkinsonisme, troubles cognitifs progressifs</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 p-2"><strong>Maladie de Huntington</strong></td>
                  <td class="border border-gray-300 p-2">30–50 ans</td>
                  <td class="border border-gray-300 p-2">Striatum (putamen, noyau caudé)</td>
                  <td class="border border-gray-300 p-2">Chorée, troubles comportementaux, démence</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2"><strong>Atrophie cortico-basale (ACB)</strong></td>
                  <td class="border border-gray-300 p-2">60–70 ans</td>
                  <td class="border border-gray-300 p-2">Cortex pariétal et frontal, ganglions basaux</td>
                  <td class="border border-gray-300 p-2">Akinésie, rigidité asymétrique, apraxie, myoclonies corticales</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 p-2"><strong>Dégénérescence frontotemporale (DFT)</strong></td>
                  <td class="border border-gray-300 p-2">50–65 ans</td>
                  <td class="border border-gray-300 p-2">Cortex frontal et temporal</td>
                  <td class="border border-gray-300 p-2">Troubles du comportement, aphasie progressive</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2"><strong>Ataxie cérébelleuse dégénérative</strong></td>
                  <td class="border border-gray-300 p-2">Variable</td>
                  <td class="border border-gray-300 p-2">Cervelet, tronc cérébral</td>
                  <td class="border border-gray-300 p-2">Ataxie, dysarthrie, nystagmus</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 p-2"><strong>Paralysie supranucléaire progressive (PSP)</strong></td>
                  <td class="border border-gray-300 p-2">60–70 ans</td>
                  <td class="border border-gray-300 p-2">Tronc cérébral, noyaux oculomoteurs</td>
                  <td class="border border-gray-300 p-2">Parkinsonisme axial, troubles oculomoteurs verticaux, chutes précoces</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2"><strong>Atrophie multisystématisée (AMS)</strong></td>
                  <td class="border border-gray-300 p-2">50–70 ans</td>
                  <td class="border border-gray-300 p-2">Cervelet, ganglions basaux, tronc cérébral</td>
                  <td class="border border-gray-300 p-2">Parkinsonisme, ataxie, dysautonomie</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
            <h4 class="font-semibold text-yellow-900 mb-2">4️⃣ Signes cliniques communs</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Cognitifs</strong> : mémoire, langage, attention, orientation, jugement</li>
              <li><strong>Comportementaux / psychiatriques</strong> : apathie, dépression, agitation, hallucinations</li>
              <li><strong>Moteurs</strong> : tremblement, rigidité, bradykinésie, ataxie, mouvements involontaires</li>
              <li><strong>Autonomiques</strong> : hypotension orthostatique, troubles urinaires et digestifs</li>
            </ul>
          </div>

          <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
            <h4 class="font-semibold text-teal-900 mb-2">5️⃣ Examens complémentaires</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>IRM cérébrale</strong> : atrophie corticale, hippocampique ou ganglions basaux selon la maladie</li>
              <li><strong>TDM cérébrale</strong> : utile si IRM non disponible</li>
              <li><strong>PET / SPECT</strong> : hypométabolisme corticale (Alzheimer, DCL), dopaminergique (Parkinson, DCL)</li>
              <li><strong>LCR</strong> : biomarqueurs (β-amyloïde, tau total et phosphorylé)</li>
              <li><strong>Bilan génétique</strong> : Huntington, DFT familiale, certaines ataxies</li>
              <li><strong>Évaluation neuropsychologique</strong> : bilan cognitif précis</li>
            </ul>
          </div>

          <div class="bg-green-50 border-l-4 border-green-500 p-3">
            <h4 class="font-semibold text-green-900 mb-2">6️⃣ Diagnostic</h4>
            <p class="text-sm mb-2"><strong>Basé sur :</strong></p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Histoire clinique progressive</strong></li>
              <li><strong>Examen neurologique et cognitif</strong></li>
              <li><strong>Imagerie et biomarqueurs</strong></li>
              <li><strong>Exclusion</strong> : causes vasculaires, métaboliques, infectieuses ou tumorales</li>
            </ul>
          </div>

          <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
            <h4 class="font-semibold text-cyan-900 mb-2">7️⃣ Traitement</h4>
            
            <div class="mb-3">
              <h5 class="font-semibold text-cyan-800">💊 A. Traitement symptomatique</h5>
              <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                <li><strong>Cognitif</strong> : inhibiteurs de l'acétylcholinestérase (Alzheimer), mémantine</li>
                <li><strong>Comportemental</strong> : antidépresseurs, antipsychotiques à faible dose si nécessaire</li>
                <li><strong>Moteur</strong> : L-dopa (Parkinson), kinésithérapie, orthophonie</li>
              </ul>
            </div>

            <div class="mb-3">
              <h5 class="font-semibold text-cyan-800">🤝 B. Prise en charge non médicamenteuse</h5>
              <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Rééducation cognitive, kinésithérapie, ergothérapie</li>
                <li>Soutien psychologique pour patient et famille</li>
                <li>Adaptation environnementale et sécurité à domicile</li>
              </ul>
            </div>

            <div>
              <h5 class="font-semibold text-cyan-800">🔬 C. Traitements curatifs</h5>
              <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                <li>⚠️ Actuellement <strong>aucun traitement curatif</strong> pour la majorité des encéphalopathies dégénératives</li>
                <li><strong>Recherche en cours</strong> : immunothérapie anti-β-amyloïde, thérapies géniques, cellules souches</li>
              </ul>
            </div>
          </div>

          <div class="bg-red-50 border-l-4 border-red-500 p-3">
            <h4 class="font-semibold text-red-900 mb-2">8️⃣ Évolution et pronostic</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>⚠️ <strong>Progression inéluctable et chronique</strong></li>
              <li>Dépend de la maladie spécifique et de l'âge de début</li>
              <li><strong>Facteurs aggravants</strong> : comorbidités, manque de suivi, absence de rééducation</li>
              <li>Pronostic fonctionnel et autonomie sévèrement affectés dans les formes avancées</li>
            </ul>
          </div>

          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
            <h4 class="font-semibold text-indigo-900 mb-2">9️⃣ Points clés pour le neurologue</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>🔑 <strong>Identifier la forme dégénérative spécifique</strong> : Alzheimer, Parkinson, Huntington, DFT…</li>
              <li>🤝 <strong>Suivi multidisciplinaire</strong> : neurologie, neuropsychologie, rééducation, soins de support</li>
              <li>🔍 <strong>Différencier des causes réversibles d'encéphalopathie</strong> : carence B12, hypothyroïdie, hydrocéphalie à pression normale, infections</li>
            </ul>
          </div>
        </div>`,
        children: [
          { code: "C10A01", name: "Maladie d'Alzheimer" }, 
          { code: "C10A02", name: "Démence à corps de Lewy" }, 
          { code: "C10A03", name: "Démence vasculaire" }, 
          { 
            code: "C10A04", 
            name: "Démence de la maladie de Pick",
            tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-purple-700">🧠 DÉMENCE DE LA MALADIE DE PICK (DLFT - bvFTD)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET NOSOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-gray-700">📜 Historique</p>
              <p class="text-xs">Décrite par <strong>Arnold Pick</strong> en 1892</p>
            </div>
            
            <div class="bg-yellow-50 p-2 rounded">
              <p class="font-semibold text-yellow-800">⚠️ Terminologie Moderne</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>"Maladie de Pick"</strong> : Réservé à la description <strong>neuropathologique</strong> (présence Corps de Pick à l'histologie)</li>
                <li><strong>Correspondance clinique</strong> : <strong>Variante Comportementale de la DLFT</strong> (bvFTD - behavioral variant FrontoTemporal Dementia)</li>
              </ul>
            </div>
            
            <div>
              <p class="font-semibold text-purple-700">🎯 Définition</p>
              <p class="text-xs">Démence dégénérative <strong>focale</strong> touchant les <strong>lobes frontaux et temporaux</strong></p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ ÉPIDÉMIOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Âge de début</strong> : Maladie <strong>présénile</strong> → Début précoce <strong>45-65 ans</strong> (+ jeune qu'Alzheimer)</li>
              <li><strong>Fréquence</strong> : <span class="text-red-700 font-bold">2ème cause de démence dégénérative &lt; 65 ans</span> (après Alzheimer)</li>
              <li><strong>Hérédité</strong> : Formes familiales fréquentes (<strong>30-50%</strong> des cas)
                <ul class="list-circle ml-4 text-xs">
                  <li>Mutations génétiques : <strong>MAPT, GRN, C9orf72</strong></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">3️⃣ ANATOMOPATHOLOGIE</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded text-sm">
              <p class="font-semibold text-orange-700 mb-1">🔬 Macroscopie</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Atrophie sévère <strong>"en lame de couteau"</strong></li>
                <li>Localisée : <strong>Pôles frontaux et temporaux antérieurs</strong></li>
                <li>Souvent <strong>asymétrique</strong></li>
              </ul>
            </div>

            <div class="bg-pink-50 p-2 rounded text-sm border border-pink-400">
              <p class="font-semibold text-pink-800 mb-1">🔬 Microscopie (Spécifique Maladie de Pick)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Corps de Pick</strong> : Inclusions intraneuronales argentophiles, sphériques</li>
                <li><strong>Cellules de Pick</strong> : Neurones ballonnés (chromatolyse centrale)</li>
                <li><strong>Protéinopathie</strong> : Accumulation protéine <strong>Tau</strong> (Tauopathie 3R)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">4️⃣ PRÉSENTATION CLINIQUE (Sémiologie)</h4>
          <p class="text-sm italic mb-2">⚠️ <strong>≠ Alzheimer</strong> : Mémoire et orientation spatiale <strong>préservées au début</strong></p>
          <p class="text-sm font-bold mb-2 text-red-700">Tableau dominé par : TROUBLES COMPORTEMENT et PERSONNALITÉ</p>
          
          <div class="bg-orange-50 p-2 rounded border border-orange-400 mb-2">
            <p class="text-xs italic">📋 <strong>Critères de Rascovsky (2011)</strong> : Diagnostic probable si <strong>3 symptômes sur 6</strong></p>
          </div>

          <div class="space-y-2 text-sm">
            <div class="bg-red-100 p-2 rounded">
              <p class="font-semibold text-red-800">A. Désinhibition Comportementale Précoce</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Conduites sociales inappropriées (grossièretés, familiarité excessive, impudeur)</li>
                <li>Impulsivité, perte tact et bienséance</li>
                <li>Actes délictueux (vols étalage) sans conscience du problème</li>
              </ul>
            </div>

            <div class="bg-gray-100 p-2 rounded">
              <p class="font-semibold text-gray-800">B. Apathie ou Inertie</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Perte d'intérêt, manque d'initiative, retrait social</li>
                <li>⚠️ Souvent confondu avec <strong>dépression</strong></li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800">C. Perte de Sympathie et d'Empathie</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Indifférence affective ("froideur") face aux problèmes des proches</li>
                <li>Diminution réactivité émotionnelle</li>
              </ul>
            </div>

            <div class="bg-purple-100 p-2 rounded">
              <p class="font-semibold text-purple-800">D. Comportements Stéréotypés et Compulsifs</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Rituels de vérification, déambulation, claquement de mains</li>
                <li>Langage stéréotypé (répétition mêmes phrases)</li>
              </ul>
            </div>

            <div class="bg-green-100 p-2 rounded">
              <p class="font-semibold text-green-800">E. Hyperorality et Changements Alimentaires</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Gloutonnerie, préférence marquée pour le sucré</li>
                <li>Consommation excessive alcool/tabac (apparition ou reprise)</li>
                <li>Exploration orale objets (tout mettre à la bouche comme enfant)</li>
              </ul>
            </div>

            <div class="bg-indigo-100 p-2 rounded">
              <p class="font-semibold text-indigo-800">F. Profil Neuropsychologique (Exécutif)</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Déficit fonctions exécutives</strong> : planification, jugement, flexibilité mentale</li>
                <li>✅ <strong>Mémoire épisodique et visuo-spatiales relativement ÉPARGNÉES</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ DIAGNOSTIC PARACLINIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 mb-1">A. Imagerie Structurelle (IRM Cérébrale) - EXAMEN CLÉ</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Signes</strong> : Atrophie corticale focale <strong>lobes frontaux et temporaux antérieurs</strong></li>
                <li>Élargissement cornes frontales ventricules latéraux</li>
                <li><strong>Aspect</strong> : Atrophie souvent très <strong>asymétrique</strong> (+ marquée gauche ou droite)</li>
                <li><strong>Contraste majeur avec Alzheimer</strong> : <span class="text-green-700 font-bold">Lobes pariétal et occipital NORMAUX</span></li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded text-sm">
              <p class="font-semibold text-purple-700 mb-1">B. Imagerie Fonctionnelle (TEP-scan FDG ou TEMP)</p>
              <p class="text-xs italic mb-1">Indispensable si IRM peu contributive au début</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Signe</strong> : <strong>Hypométabolisme</strong> (baisse activité) fronto-temporal antérieur</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded text-sm">
              <p class="font-semibold text-teal-700 mb-1">C. Ponction Lombaire (Biomarqueurs)</p>
              <p class="text-xs italic mb-1">⚠️ Sert surtout à <strong>éliminer</strong> une maladie d'Alzheimer</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>DLFT pure</strong> : Marqueurs Amyloïde et Tau <strong>normaux</strong></li>
                <li>Ou : Tau isolément élevée mais sans baisse d'Amyloïde</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">6️⃣ DIAGNOSTIC DIFFÉRENTIEL</h4>
          
          <div class="bg-red-100 p-2 rounded border-2 border-red-500 mb-2">
            <p class="font-semibold text-red-800 mb-1">🚨 Troubles Psychiatriques (LE PIÈGE N°1)</p>
            <ul class="list-disc ml-5 text-sm">
              <li>Dépression mélancolique</li>
              <li>Trouble Bipolaire (phase maniaque)</li>
              <li>Schizophrénie tardive</li>
            </ul>
            <p class="text-xs mt-1 text-red-700"><strong>⚠️ De nombreux patients traités en psychiatrie par ERREUR au début</strong></p>
          </div>

          <div class="bg-white p-2 rounded text-sm">
            <ul class="list-disc ml-5 text-xs">
              <li><strong>Maladie d'Alzheimer</strong> (Variante frontale) : Plus rare, mais peut débuter par troubles comportement</li>
              <li><strong>Tumeurs cérébrales frontales</strong> : Méningiome olfactif, gliome</li>
            </ul>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">7️⃣ PRISE EN CHARGE THÉRAPEUTIQUE</h4>
          <p class="text-sm text-red-700 font-bold mb-2">⚠️ AUCUN TRAITEMENT CURATIF</p>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">💊 Traitements Médicamenteux (Symptomatiques)</p>
              
              <div class="space-y-1 text-sm">
                <div class="bg-green-50 p-1 rounded">
                  <p class="font-semibold text-green-800 text-xs">✅ ISRS (Antidépresseurs sérotoninergiques)</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>Trazodone, Citalopram</strong></li>
                    <li>Efficaces pour : impulsivité, désinhibition, compulsions</li>
                  </ul>
                </div>

                <div class="bg-yellow-50 p-1 rounded">
                  <p class="font-semibold text-yellow-800 text-xs">⚠️ Neuroleptiques atypiques</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>Quétiapine</strong> à faible dose si agitation sévère</li>
                    <li>Prudence : sensibilité accrue aux effets secondaires</li>
                  </ul>
                </div>

                <div class="bg-red-100 p-1 rounded border border-red-500">
                  <p class="font-semibold text-red-800 text-xs">⛔ CONTRE-INDICATION RELATIVE</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>Anticholinestérasiques</strong> (Donépézil/Aricept utilisés dans Alzheimer)</li>
                    <li>❌ <strong>INEFFICACES</strong> et peuvent <strong>AGGRAVER l'agitation</strong> dans DLFT</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">🏥 Prise en Charge Non Médicamenteuse</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Soutien aux aidants</strong> (fardeau très lourd dû aux troubles comportement)</li>
                <li><strong>Orthophonie</strong> (si troubles langage associés)</li>
                <li><strong>Protection juridique</strong> (Tutelle/Curatelle) <strong>RAPIDE</strong>
                  <ul class="list-circle ml-4 text-xs">
                    <li>En raison des troubles du jugement (dépenses inconsidérées)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
          <h4 class="font-semibold text-indigo-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🎂 <strong>Présénile</strong> : 45-65 ans (2ème cause démence &lt; 65 ans)</li>
              <li>🧬 <strong>Hérédité fréquente</strong> : 30-50% (MAPT, GRN, C9orf72)</li>
              <li>🧠 <strong>Atrophie</strong> : Frontale + Temporale antérieure ("lame de couteau", asymétrique)</li>
              <li>🎭 <strong>Clinique</strong> : Troubles comportement/personnalité (≠ Alzheimer : mémoire préservée début)</li>
              <li>📋 <strong>Critères Rascovsky</strong> : 3/6 symptômes (Désinhibition, Apathie, Perte empathie, Stéréotypies, Hyperorality, Déficit exécutif)</li>
              <li>🧲 <strong>IRM clé</strong> : Pariétal/Occipital NORMAUX (vs Alzheimer)</li>
              <li>🚨 <strong>Piège</strong> : Souvent traité en psychiatrie par erreur</li>
              <li>💊 <strong>Traitement</strong> : ISRS (Trazodone, Citalopram), ⛔ Pas d'anticholinestérasiques</li>
              <li>⚖️ <strong>Protection juridique RAPIDE</strong> (troubles jugement)</li>
            </ul>
          </div>
        </div>
      </div>`
          }, 
          { 
            code: "C10A05", 
            name: "Démence de la maladie de Creutzfeldt-Jakob",
            tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-red-700">⚠️ MALADIE DE CREUTZFELDT-JAKOB (MCJ)</h3>
        
        <div class="bg-red-50 p-3 rounded border-l-4 border-red-500">
          <h4 class="font-semibold text-red-800 mb-2">1️⃣ DÉFINITION ET PHYSIOPATHOLOGIE</h4>
          <p class="text-sm mb-2"><strong>Maladie neurodégénérative RAPIDE et FATALE causée par un PRION</strong></p>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-800 mb-1">🔬 Mécanisme Prion</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>PrP<sup>c</sup></strong> (cellulaire) : Protéine normale de l'hôte</li>
                <li><strong>PrP<sup>sc</sup></strong> (scrapie) : Forme pathologique (changement conformation 3D)</li>
                <li><strong>Cascade</strong> : PrP<sup>sc</sup> insoluble + résistante aux protéases → Induit conversion PrP<sup>c</sup> → PrP<sup>sc</sup> (réaction en chaîne)</li>
              </ul>
            </div>
            
            <div class="bg-red-100 p-2 rounded border border-red-400">
              <p class="font-semibold text-red-800 mb-1">☠️ Conséquences</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Accumulation protéique</li>
                <li>Mort neuronale</li>
                <li><strong>Vacuolisation tissu cérébral (SPONGIOSE)</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">2️⃣ CLASSIFICATION DES FORMES</h4>
          
          <div class="bg-white p-2 rounded text-sm">
            <table class="w-full">
              <thead class="bg-blue-100">
                <tr>
                  <th class="text-left p-1 border">Forme</th>
                  <th class="text-left p-1 border">Fréquence</th>
                  <th class="text-left p-1 border">Cause / Caractéristiques</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-yellow-50">
                  <td class="p-1 border"><strong>Sporadique (sCJD)</strong></td>
                  <td class="p-1 border text-red-700"><strong>85%</strong></td>
                  <td class="p-1 border">Cause inconnue (conversion spontanée ou mutation somatique). Pic 60-70 ans</td>
                </tr>
                <tr class="border-b bg-purple-50">
                  <td class="p-1 border"><strong>Génétique (gCJD)</strong></td>
                  <td class="p-1 border"><strong>10-15%</strong></td>
                  <td class="p-1 border">Mutation gène PRNP (ex: E200K)</td>
                </tr>
                <tr class="border-b bg-orange-50">
                  <td class="p-1 border"><strong>Iatrogène (iCJD)</strong></td>
                  <td class="p-1 border"><strong>&lt; 1%</strong></td>
                  <td class="p-1 border">Contamination : greffes dure-mère, hormone de croissance extractive (avant 1988), instruments neurochirurgicaux</td>
                </tr>
                <tr class="border-b bg-pink-50">
                  <td class="p-1 border"><strong>Variante (vCJD)</strong></td>
                  <td class="p-1 border">Exceptionnelle</td>
                  <td class="p-1 border">Liée à ESB ("Vache Folle"). Sujets plus jeunes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ PRÉSENTATION CLINIQUE</h4>
          <p class="text-sm italic mb-2">⏱️ Évolution <strong>SUBAIGUË</strong> : Quelques semaines à quelques mois</p>
          
          <div class="bg-red-100 p-2 rounded border-2 border-red-500 mb-2">
            <p class="font-semibold text-red-800 mb-1">🔺 TRIADE CLINIQUE ÉVOCATRICE</p>
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li><strong>1. Démence rapidement progressive</strong>
                <ul class="list-circle ml-4 text-xs">
                  <li>Troubles mnésiques, désorientation</li>
                  <li>Ralentissement idéatoire majeur</li>
                </ul>
              </li>
              <li><strong>2. Myoclonies</strong>
                <ul class="list-circle ml-4 text-xs">
                  <li>Secousses musculaires involontaires</li>
                  <li>Déclenchées par bruit/toucher (<strong>Sursaut inépuisable</strong>)</li>
                </ul>
              </li>
              <li><strong>3. Signes neurologiques focaux associés</strong></li>
            </ul>
          </div>

          <div class="space-y-2 text-sm">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 mb-1">Signes Neurologiques Focaux :</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Syndrome cérébelleux</strong> : Ataxie, troubles marche (fréquent au début)</li>
                <li><strong>Troubles visuels</strong> : Cécité corticale, hallucinations (Variante Heidenhain)</li>
                <li><strong>Signes pyramidaux et extrapyramidaux</strong> : Rigidité</li>
              </ul>
            </div>

            <div class="bg-gray-200 p-2 rounded border-2 border-gray-600">
              <p class="font-semibold text-gray-800 mb-1">⚰️ Stade Terminal</p>
              <p class="text-xs"><strong>Mutisme akinétique</strong> (patient éveillé mais ne bouge plus, ne parle plus) → Décès</p>
              <p class="text-xs mt-1 text-red-700"><strong>Médiane survie : 4-6 mois</strong> (forme sporadique)</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">4️⃣ DÉMARCHE DIAGNOSTIQUE (Critères CDC/OMS)</h4>
          <p class="text-sm italic mb-2">⚠️ Diagnostic de <strong>CERTITUDE</strong> = neuropathologique (autopsie)<br/>Diagnostic <strong>PROBABLE</strong> = faisceau d'arguments paracliniques</p>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 mb-1">A. IRM Cérébrale (Séquence Diffusion - DWI) - EXAMEN LE PLUS SENSIBLE</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Signes</strong> : <strong>Hypersignaux en Diffusion</strong> (et FLAIR)
                  <ul class="list-circle ml-4 text-xs">
                    <li><strong>Cortex</strong> : Aspect en <strong>"ruban cortical"</strong></li>
                    <li><strong>Noyaux gris centraux</strong> : Noyau caudé + Putamen</li>
                  </ul>
                </li>
                <li class="text-xs mt-1"><strong>⚠️ Variante vCJD</strong> : Hypersignal postérieur thalamus (<strong>"Signe Crosse de Hockey"</strong> ou <strong>"Pulvinar sign"</strong>)</li>
              </ul>
            </div>

            <div class="bg-green-50 p-2 rounded">
              <p class="font-semibold text-green-800 mb-1">B. Ponction Lombaire (LCR)</p>
              <p class="text-xs italic mb-1">LCR généralement pauci-cellulaire (pas de méningite)</p>
              <ul class="list-disc ml-5 text-sm space-y-1">
                <li><strong>Protéine 14-3-3</strong> :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Marqueur destruction neuronale rapide</li>
                    <li>⚠️ Sensible mais <strong>PEU SPÉCIFIQUE</strong> (positif si AVC ou encéphalite)</li>
                    <li>Valeur diagnostique remise en cause isolément</li>
                  </ul>
                </li>
                <li class="bg-yellow-50 p-1 rounded"><strong>RT-QuIC</strong> (Real-Time Quaking-Induced Conversion) :
                  <ul class="list-circle ml-4 text-xs">
                    <li>🌟 <strong>RÉVOLUTION DIAGNOSTIQUE RÉCENTE</strong></li>
                    <li>Détecte directement l'activité d'amplification du prion pathologique</li>
                    <li><strong>Spécificité proche de 100%</strong></li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-orange-700 mb-1">C. Électroencéphalogramme (EEG)</p>
              <ul class="list-disc ml-5 text-sm">
                <li><strong>Signe typique</strong> : <strong>Ondes lentes triphasiques périodiques</strong> (1-2 cycles/seconde)</li>
                <li>⚠️ Apparaît souvent tardivement (après 3 mois d'évolution)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ DIAGNOSTIC DIFFÉRENTIEL (Les "MCJ-like")</h4>
          <p class="text-sm font-bold text-red-700 mb-2">⚠️ VITAL : Éliminer les causes CURABLES devant démence rapide</p>
          
          <div class="bg-white p-2 rounded text-sm">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Encéphalites Auto-immunes</strong> :
                <ul class="list-circle ml-4 text-xs">
                  <li>Anti-NMDA, Anti-LGI1</li>
                  <li>→ Faire panel anticorps dans LCR</li>
                </ul>
              </li>
              <li><strong>Encéphalopathie d'Hashimoto</strong> :
                <ul class="list-circle ml-4 text-xs">
                  <li>Démence + Myoclonies + Anticorps antithyroïdiens très élevés</li>
                  <li>✅ <strong>Répond aux CORTICOÏDES</strong></li>
                </ul>
              </li>
              <li><strong>Lymphome cérébral intravasculaire</strong></li>
              <li><strong>Toxiques</strong> : Encéphalopathie au Bismuth (historique), Lithium</li>
            </ul>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ PRISE EN CHARGE ET BIOSÉCURITÉ</h4>
          
          <div class="space-y-2">
            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 mb-1">A. Traitement</p>
              <p class="text-sm text-red-700"><strong>❌ AUCUN TRAITEMENT CURATIF</strong></p>
              <p class="text-xs mt-1">Prise en charge purement <strong>PALLIATIVE</strong> :</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Benzodiazépines (myoclonies)</li>
                <li>Soins de confort</li>
                <li>Accompagnement fin de vie</li>
              </ul>
            </div>

            <div class="bg-yellow-50 p-2 rounded border-2 border-yellow-600">
              <p class="font-semibold text-yellow-800 mb-1">B. Risque de Transmission et Hygiène</p>
              
              <div class="space-y-1 text-sm">
                <div class="bg-green-100 p-1 rounded">
                  <p class="text-xs"><strong>✅ MCJ NON CONTAGIEUSE</strong> par contact social (toucher, air)</p>
                </div>

                <div class="bg-red-50 p-1 rounded">
                  <p class="font-semibold text-red-700 text-xs mb-1">⚠️ Risque Transmission :</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li>Tissu nerveux</li>
                    <li>Cornée</li>
                    <li>LCR</li>
                  </ul>
                </div>

                <div class="bg-blue-50 p-1 rounded">
                  <p class="font-semibold text-blue-700 text-xs mb-1">🛡️ Précautions :</p>
                  <ul class="list-disc ml-5 text-xs space-y-1">
                    <li><strong>Isolement standard</strong> en chambre</li>
                    <li><strong>Procédure "Prion"</strong> au bloc ou pour PL :
                      <ul class="list-circle ml-4">
                        <li>⚠️ Prion résiste : autoclave 121°C standard, alcool</li>
                      </ul>
                    </li>
                    <li><strong>Matériel à usage unique OBLIGATOIRE</strong> pour PL</li>
                    <li><strong>Stérilisation spécifique</strong> (instruments métalliques réutilisables) :
                      <ul class="list-circle ml-4">
                        <li>Autoclave 134°C × 18 min</li>
                        <li>OU Soude 1N</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>☠️ <strong>Maladie PRION</strong> : PrP<sup>sc</sup> → Spongiose cérébrale</li>
              <li>📊 <strong>85% Sporadique</strong> (60-70 ans), 10-15% Génétique (PRNP)</li>
              <li>🔺 <strong>TRIADE</strong> : Démence rapide + Myoclonies + Signes neurologiques focaux</li>
              <li>⏱️ <strong>Survie médiane : 4-6 mois</strong> (mutisme akinétique)</li>
              <li>🧲 <strong>IRM DWI</strong> : Hypersignaux "ruban cortical" + noyaux gris (EXAMEN CLÉ)</li>
              <li>🌟 <strong>RT-QuIC</strong> : Révolution diagnostique (Spé ~100%)</li>
              <li>⚡ <strong>EEG</strong> : Ondes triphasiques périodiques (tardif)</li>
              <li>⚠️ <strong>Diagnostic différentiel</strong> : Encéphalites auto-immunes (CURABLES!)</li>
              <li>❌ <strong>Aucun traitement curatif</strong> : Soins palliatifs</li>
              <li>🛡️ <strong>Biosécurité</strong> : Prion résiste stérilisation standard → Autoclave 134°C × 18 min ou Soude 1N</li>
            </ul>
          </div>
        </div>
      </div>`
          }, 
          { code: "C10A06", name: "Démence de la maladie de Huntington" }, 
          { code: "C10A07", name: "Autres démences" }
        ] 
      }
    ],
  },
  {
    code: "C11",
    name: "Les néphropathies",
    children: [
        { 
          code: "C11A", 
          name: "Néphropathies glomérulaires", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-blue-800">🫘 NÉPHROPATHIES GLOMÉRULAIRES – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">📊 Tableau comparatif des principales néphropathies glomérulaires</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Code</th>
                    <th class="border border-gray-300 p-2 text-left">Maladie</th>
                    <th class="border border-gray-300 p-2 text-left">Clinique</th>
                    <th class="border border-gray-300 p-2 text-left">Biologie / Urine</th>
                    <th class="border border-gray-300 p-2 text-left">Biopsie</th>
                    <th class="border border-gray-300 p-2 text-left">Traitement / Particularités</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>A04</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Glomérulonéphrite membrano-proliférative (GMP)</strong></td>
                    <td class="border border-gray-300 p-2">Syndrome néphrotique ± hématurie, HTA fréquente, IRC progressive</td>
                    <td class="border border-gray-300 p-2">Protéinurie, hématurie, hypocomplémentémie (C3 ↓, parfois C4)</td>
                    <td class="border border-gray-300 p-2">Double contour membrane basale, prolifération mésangiale, dépôts immunitaires</td>
                    <td class="border border-gray-300 p-2">Corticostéroïdes ± immunosuppresseurs, traitement de la cause sous-jacente (infection, auto-immunité)</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>A05</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Néphropathie à IgA (Maladie de Berger)</strong></td>
                    <td class="border border-gray-300 p-2">Hématurie macroscopique récurrente, souvent après infection ORL ; parfois néphrotique</td>
                    <td class="border border-gray-300 p-2">Hématurie microscopique ± protéinurie modérée, fonction rénale souvent normale au début</td>
                    <td class="border border-gray-300 p-2">Dépôts IgA mésangiaux à l'immunofluorescence</td>
                    <td class="border border-gray-300 p-2">IEC/ARA II pour protéinurie/HTA ; corticoïdes si atteinte sévère ; surveillance régulière</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>A06</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Néphropathie diabétique</strong></td>
                    <td class="border border-gray-300 p-2">Syndrome néphrotique progressif, HTA fréquente, diabète de longue durée</td>
                    <td class="border border-gray-300 p-2">Protéinurie progressive, microalbuminurie initiale</td>
                    <td class="border border-gray-300 p-2">Épaississement membrane basale, nodules Kimmelstiel-Wilson</td>
                    <td class="border border-gray-300 p-2">Contrôle glycémie et TA, IEC/ARA II, statines, dialyse si IRCT</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>A07</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Amylose (AA et AL)</strong></td>
                    <td class="border border-gray-300 p-2">Syndrome néphrotique, parfois hématurie, insuffisance rénale progressive</td>
                    <td class="border border-gray-300 p-2">Protéinurie massive, hypoalbuminémie, parfois myélome (AL)</td>
                    <td class="border border-gray-300 p-2">Dépôts amyloïdes congophiles, biréfringence en polarisation</td>
                    <td class="border border-gray-300 p-2">Traitement de la cause : anti-inflammatoire chronique (AA), chimiothérapie ± transplantation (AL)</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>A08</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Syndrome d'Alport</strong></td>
                    <td class="border border-gray-300 p-2">Hématurie persistante, surdité neurosensorielle, anomalies oculaires, progression vers IRCT</td>
                    <td class="border border-gray-300 p-2">Hématurie microscopique ± protéinurie, créatinine normale initialement</td>
                    <td class="border border-gray-300 p-2">Membrane basale épaissie et stratifiée, dépôts collagène IV muté</td>
                    <td class="border border-gray-300 p-2">Surveillance, contrôle TA, parfois greffe rénale ; thérapie génétique en recherche</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">🔑 Points clés</h4>
              <ul class="list-disc list-inside space-y-2 text-sm">
                <li><strong>🔬 Biopsie rénale indispensable</strong> pour diagnostic précis</li>
                <li><strong>⚠️ Protéinurie</strong> = facteur de progression vers insuffisance rénale chronique</li>
                <li><strong>💊 IEC/ARA II</strong> = traitement de base pour toutes protéinuries persistantes</li>
                <li><strong>📊 Surveillance régulière</strong> de la fonction rénale et TA essentielle</li>
                <li><strong>🎯 Certaines formes</strong> (Amylose AL, Syndrome d'Alport) ont traitement spécifique ou évolution génétique</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">📋 Résumé des syndromes cliniques</h4>
              <div class="space-y-2 text-sm">
                <div class="bg-white p-2 rounded border border-green-200">
                  <p><strong>🔴 Syndrome néphrotique</strong></p>
                  <p class="text-xs ml-2">→ Protéinurie massive (&gt;3g/24h), hypoalbuminémie, œdèmes, hyperlipidémie</p>
                  <p class="text-xs ml-2">→ Présent dans : GMP, Néphropathie diabétique, Amylose</p>
                </div>
                <div class="bg-white p-2 rounded border border-green-200">
                  <p><strong>🔴 Hématurie glomérulaire</strong></p>
                  <p class="text-xs ml-2">→ Érythrocytes déformés, cylindres hématiques</p>
                  <p class="text-xs ml-2">→ Présent dans : IgA (macroscopique récurrente), GMP, Alport</p>
                </div>
                <div class="bg-white p-2 rounded border border-green-200">
                  <p><strong>📈 HTA et IRC progressive</strong></p>
                  <p class="text-xs ml-2">→ Complications fréquentes nécessitant contrôle strict TA</p>
                  <p class="text-xs ml-2">→ Risque d'évolution vers IRCT (dialyse/transplantation)</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">🔬 Importance de la biopsie rénale</h4>
              <p class="text-sm mb-2">La biopsie rénale permet :</p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Diagnostic précis</strong> de la néphropathie glomérulaire</li>
                <li><strong>Orientation thérapeutique</strong> (corticoïdes, immunosuppresseurs, traitement spécifique)</li>
                <li><strong>Évaluation pronostique</strong> (degré de fibrose, atrophie tubulaire)</li>
                <li><strong>Identification des dépôts</strong> (IgA, amyloïde, complexes immuns)</li>
              </ul>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">💊 Principes thérapeutiques généraux</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>IEC ou ARA II</strong> : Réduire protéinurie et ralentir progression IRC</li>
                <li><strong>Contrôle strict TA</strong> : Objectif &lt;130/80 mmHg</li>
                <li><strong>Régime hyposodé</strong> : Limiter rétention hydrosodée</li>
                <li><strong>Statines</strong> : Si dyslipidémie (fréquente dans syndrome néphrotique)</li>
                <li><strong>Restriction protéique modérée</strong> : 0,8-1 g/kg/j si IRC</li>
                <li><strong>Corticostéroïdes ± immunosuppresseurs</strong> : Selon forme et sévérité</li>
                <li><strong>Traitement étiologique</strong> : Contrôle glycémique (diabète), traitement cause infectieuse/auto-immune (GMP), chimiothérapie (amylose AL)</li>
              </ul>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">⚠️ Complications à surveiller</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Insuffisance rénale chronique progressive</strong> → IRCT nécessitant dialyse/transplantation</li>
                <li><strong>Complications thrombo-emboliques</strong> (syndrome néphrotique)</li>
                <li><strong>Infections récurrentes</strong> (immunosuppression, syndrome néphrotique)</li>
                <li><strong>HTA non contrôlée</strong> → complications cardiovasculaires</li>
                <li><strong>Anémie</strong> (IRC avancée)</li>
                <li><strong>Troubles métaboliques</strong> (hyperkaliémie, acidose, hyperphosphatémie)</li>
              </ul>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">🎯 Surveillance recommandée</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Créatinine sérique + DFG</strong> : Tous les 3-6 mois</li>
                <li><strong>Protéinurie des 24h</strong> : Tous les 3-6 mois</li>
                <li><strong>Tension artérielle</strong> : À chaque consultation</li>
                <li><strong>Ionogramme complet</strong> : Tous les 3-6 mois</li>
                <li><strong>Albuminémie</strong> : Si syndrome néphrotique</li>
                <li><strong>Échographie rénale</strong> : Annuelle ou si détérioration</li>
                <li><strong>Consultation néphrologique</strong> : Régulière selon sévérité</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C11A04", name: "Glomérulonéphrite membrano-proliférative" }, 
            { code: "C11A05", name: "Néphropathie à IgA (maladie de Berger)" }, 
            { code: "C11A06", name: "Néphropathie diabétique" }, 
            { code: "C11A07", name: "Amylose (AA et AL)" }, 
            { code: "C11A08", name: "Syndrome d'Alport" }
          ] 
        },
        { 
          code: "C11B", 
          name: "Néphropathies tubulo-intersticielles", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-teal-800">🧪 NÉPHROPATHIES TUBULO-INTERSTITIELLES CHRONIQUES (NTIC) – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">📊 Tableau comparatif des principales NTIC</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Code</th>
                    <th class="border border-gray-300 p-2 text-left">Maladie</th>
                    <th class="border border-gray-300 p-2 text-left">Clinique</th>
                    <th class="border border-gray-300 p-2 text-left">Biologie / Urine</th>
                    <th class="border border-gray-300 p-2 text-left">Biopsie / Imagerie</th>
                    <th class="border border-gray-300 p-2 text-left">Traitement / Particularités</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>B01</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Pyélonéphrite chronique</strong></td>
                    <td class="border border-gray-300 p-2">Douleurs lombaires, fièvre intermittente, infection urinaire récidivante, HTA</td>
                    <td class="border border-gray-300 p-2">Leucocyturie, bactériurie, protéinurie modérée, fonction rénale altérée</td>
                    <td class="border border-gray-300 p-2">Cicatrices rénales à l'IRM ou scintigraphie, infiltrats interstitiels et fibrose à la biopsie</td>
                    <td class="border border-gray-300 p-2">Antibiothérapie prolongée ciblée, correction des anomalies urologiques (reflux, obstruction), surveillance fonction rénale</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>B02</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Syndrome de Gougerot-Sjögren (atteinte rénale interstitielle)</strong></td>
                    <td class="border border-gray-300 p-2">Sécheresse buccale et oculaire, fatigue, arthralgies, polyurie / nycturie</td>
                    <td class="border border-gray-300 p-2">Protéinurie modérée, leucocyturie aseptique, hypergammaglobulinémie, déficit fonction rénale tubulaire (acidose tubulaire, hyperkaliémie ou hypokaliémie selon type)</td>
                    <td class="border border-gray-300 p-2">Infiltrat lymphoplasmocytaire interstitiel à la biopsie rénale</td>
                    <td class="border border-gray-300 p-2">Immunosuppresseurs (corticoïdes ± azathioprine), traitement symptomatique, contrôle TA et fonction rénale</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>B03</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Autres NTIC chroniques</strong></td>
                    <td class="border border-gray-300 p-2">Polyurie, nycturie, fatigue, HTA, parfois syndrome néphrotique léger</td>
                    <td class="border border-gray-300 p-2">Protéinurie modérée, anomalies électrolytiques, leucocyturie stérile</td>
                    <td class="border border-gray-300 p-2">Fibrose interstitielle et atrophie tubulaire à la biopsie</td>
                    <td class="border border-gray-300 p-2">Traitement de la cause (médicaments néphrotoxiques, métabolique, toxique), corticoïdes si inflammation active, contrôle de l'IRA ou IRC</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">🔑 Caractéristiques des NTIC</h4>
              <p class="text-sm mb-2">Les NTIC se caractérisent par :</p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Atteinte prédominante des tubules et du stroma interstitiel</strong></li>
                <li><strong>Protéinurie modérée</strong>, souvent moins importante que dans les glomérulopathies</li>
                <li><strong>Insuffisance rénale chronique progressive</strong> fréquente</li>
                <li><strong>Biopsie rénale</strong> : indispensable pour confirmer le diagnostic et l'étiologie</li>
              </ul>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">🔬 Étiologies fréquentes des NTIC</h4>
              <div class="space-y-2 text-sm">
                <div class="bg-white p-2 rounded border border-purple-200">
                  <p><strong>🦠 Infectieuses</strong></p>
                  <p class="text-xs ml-2">→ Pyélonéphrites récurrentes, infections urinaires chroniques</p>
                  <p class="text-xs ml-2">→ Tuberculose rénale, bactéries atypiques</p>
                </div>
                <div class="bg-white p-2 rounded border border-purple-200">
                  <p><strong>🛡️ Auto-immunes</strong></p>
                  <p class="text-xs ml-2">→ Syndrome de Gougerot-Sjögren (infiltrat lymphoplasmocytaire)</p>
                  <p class="text-xs ml-2">→ Sarcoïdose, lupus érythémateux systémique</p>
                </div>
                <div class="bg-white p-2 rounded border border-purple-200">
                  <p><strong>💊 Toxiques et médicamenteuses</strong></p>
                  <p class="text-xs ml-2">→ AINS (anti-inflammatoires non stéroïdiens), IPP (inhibiteurs pompe à protons)</p>
                  <p class="text-xs ml-2">→ Lithium, aminosides, produits de contraste iodés</p>
                  <p class="text-xs ml-2">→ Métaux lourds (plomb, cadmium), herbes chinoises</p>
                </div>
                <div class="bg-white p-2 rounded border border-purple-200">
                  <p><strong>⚡ Métaboliques</strong></p>
                  <p class="text-xs ml-2">→ Hypercalcémie chronique, hyperuricémie</p>
                  <p class="text-xs ml-2">→ Hypokaliémie chronique</p>
                </div>
                <div class="bg-white p-2 rounded border border-purple-200">
                  <p><strong>🚧 Obstructives</strong></p>
                  <p class="text-xs ml-2">→ Reflux vésico-urétéral, lithiase rénale chronique</p>
                  <p class="text-xs ml-2">→ Obstruction prostatique, malformations congénitales</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">🏥 Manifestations cliniques</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Symptômes généraux :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Polyurie et nycturie (défaut concentration urinaire)</li>
                    <li>Fatigue, asthénie</li>
                    <li>HTA modérée à sévère</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Symptômes spécifiques selon cause :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Infections : fièvre, douleurs lombaires, signes urinaires</li>
                    <li>Gougerot-Sjögren : sécheresse buccale/oculaire, arthralgies</li>
                    <li>Toxiques : histoire d'exposition médicamenteuse ou professionnelle</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Anomalies tubulaires :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Acidose tubulaire (type I ou II)</li>
                    <li>Troubles électrolytiques (hypokaliémie, hyperkaliémie)</li>
                    <li>Défaut de concentration des urines</li>
                    <li>Syndrome de Fanconi (forme sévère)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">🔍 Examens complémentaires</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Biologie urinaire :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Protéinurie : modérée (&lt;2g/24h habituellement)</li>
                    <li>Leucocyturie : aseptique (auto-immune) ou avec bactériurie (infectieuse)</li>
                    <li>Glycosurie sans hyperglycémie (dysfonction tubulaire)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Biologie sanguine :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Créatinine ↑, DFG ↓ (IRC progressive)</li>
                    <li>Anomalies électrolytiques (K⁺, Na⁺, HCO₃⁻, Ca²⁺)</li>
                    <li>Hypergammaglobulinémie (Gougerot-Sjögren)</li>
                    <li>Recherche auto-anticorps (anti-SSA/SSB, ANA, ANCA)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Imagerie :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Échographie rénale : taille réduite, échostructure modifiée, cicatrices</li>
                    <li>IRM ou TDM : cicatrices corticales, dilatation pyelocalicielle</li>
                    <li>Scintigraphie rénale (DMSA) : cicatrices parenchymateuses</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Biopsie rénale :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Infiltrat inflammatoire interstitiel (lymphocytes, plasmocytes)</li>
                    <li>Fibrose interstitielle et atrophie tubulaire</li>
                    <li>Confirmation étiologique (dépôts, granulomes, infection)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">💊 Traitement</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">1️⃣ Traitement étiologique :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Infectieuse</strong> : Antibiothérapie prolongée ciblée (3-6 mois), correction anomalies urologiques</li>
                    <li><strong>Auto-immune</strong> : Immunosuppresseurs (corticoïdes ± azathioprine, cyclophosphamide si sévère)</li>
                    <li><strong>Médicamenteuse</strong> : Arrêt du médicament incriminé</li>
                    <li><strong>Métabolique</strong> : Correction hypercalcémie, hyperuricémie, hypokaliémie</li>
                    <li><strong>Obstructive</strong> : Levée de l'obstacle (chirurgie, sonde, néphrostomie)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">2️⃣ Protection rénale :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>IEC ou ARA II</strong> : Ralentir progression IRC, contrôler TA</li>
                    <li><strong>Contrôle strict TA</strong> : Objectif &lt;130/80 mmHg</li>
                    <li><strong>Hydratation adéquate</strong> : Prévenir déshydratation et aggravation IRC</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">3️⃣ Traitement symptomatique :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Correction acidose</strong> : Bicarbonates si acidose métabolique</li>
                    <li><strong>Correction troubles ioniques</strong> : Supplémentation K⁺, Ca²⁺, Mg²⁺ si nécessaire</li>
                    <li><strong>Anémie</strong> : EPO si Hb &lt;10 g/dL et IRC avancée</li>
                    <li><strong>Hyperphosphatémie</strong> : Chélateurs phosphore si IRC avancée</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">4️⃣ Prévention :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Éviter néphrotoxiques (AINS, aminosides, produits de contraste)</li>
                    <li>Traitement préventif infections urinaires récidivantes</li>
                    <li>Surveillance régulière fonction rénale et TA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">⚠️ Complications et évolution</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>IRC progressive</strong> → IRCT nécessitant dialyse ou transplantation</li>
                <li><strong>HTA non contrôlée</strong> → complications cardiovasculaires</li>
                <li><strong>Infections urinaires récidivantes</strong> (pyélonéphrite chronique)</li>
                <li><strong>Troubles métaboliques sévères</strong> (acidose, hyperkaliémie, anémie)</li>
                <li><strong>Évolution fibrosante irréversible</strong> si traitement tardif</li>
              </ul>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">🎯 Surveillance recommandée</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Créatinine + DFG</strong> : Tous les 3-6 mois</li>
                <li><strong>Ionogramme complet</strong> : Tous les 3-6 mois (Na⁺, K⁺, HCO₃⁻, Ca²⁺, PO₄³⁻)</li>
                <li><strong>Protéinurie 24h</strong> : Tous les 6 mois</li>
                <li><strong>ECBU</strong> : Si symptômes urinaires (pyélonéphrite chronique)</li>
                <li><strong>Tension artérielle</strong> : À chaque consultation</li>
                <li><strong>Échographie rénale</strong> : Annuelle ou si détérioration</li>
                <li><strong>Consultation néphrologique</strong> : Régulière selon sévérité IRC</li>
              </ul>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">🔑 Points clés pour le clinicien</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🔍 <strong>Rechercher systématiquement la cause</strong> : infections, médicaments, auto-immunité, toxiques</li>
                <li>🔬 <strong>Biopsie rénale essentielle</strong> : confirme diagnostic et guide traitement</li>
                <li>💊 <strong>Arrêt néphrotoxiques impératif</strong> : AINS, lithium, IPP si suspicion</li>
                <li>⚕️ <strong>Traitement précoce</strong> : prévenir fibrose irréversible</li>
                <li>📊 <strong>Surveillance régulière IRC</strong> : prévenir complications et préparer dialyse si nécessaire</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C11B01", name: "Pyélonéphrite chronique" }, 
            { code: "C11B02", name: "Syndrome de Gougerot-Sjögren" }, 
            { code: "C11B03", name: "Autres Néphropathies tubulo-intersticielles chronique" }
          ] 
        },
        { 
          code: "C11D", 
          name: "Néphropathies décompensées", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-red-800">⚠️ NÉPHROPATHIES DÉCOMPENSÉES – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">📊 Tableau comparatif IRC non dialysée vs dialysée</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Code</th>
                    <th class="border border-gray-300 p-2 text-left">Maladie</th>
                    <th class="border border-gray-300 p-2 text-left">Définition / Clinique</th>
                    <th class="border border-gray-300 p-2 text-left">Biologie</th>
                    <th class="border border-gray-300 p-2 text-left">Traitement / Particularités</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>D01</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Insuffisance rénale chronique (IRC) non dialysée</strong></td>
                    <td class="border border-gray-300 p-2">Altération progressive et irréversible de la fonction rénale ; symptômes : fatigue, anorexie, nausées, prurit, œdèmes, HTA</td>
                    <td class="border border-gray-300 p-2">Créatinine ↑, clairance de la créatinine ↓, hyperkaliémie, anémie normocytaire, troubles phospho-calciques, acidose métabolique</td>
                    <td class="border border-gray-300 p-2">Traitement étiologique et symptomatique : contrôle TA, diurétiques, correction anémie (érythropoïétine, fer), régime hyposodé et protéiné adapté, suppléments calcium/vitamine D, suivi régulier ; préparation à la dialyse si progression</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>D02</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Insuffisance rénale chronique dialysée</strong></td>
                    <td class="border border-gray-300 p-2">IRC terminale nécessitant dialyse (hémodialyse ou dialyse péritonéale)</td>
                    <td class="border border-gray-300 p-2">Analyses similaires IRC avancée ; bilan dialyse périodique : Kt/V, urée, créatinine, électrolytes, anémie</td>
                    <td class="border border-gray-300 p-2">Dialyse régulière selon protocole (HD 3x/semaine ou DP quotidienne), contrôle de l'HTA, gestion complications (anémie, hyperparathyroïdie, troubles phospho-calciques, nutrition) ; préparation à greffe rénale si éligible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">🔑 Définition et concepts clés</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>IRC</strong> = perte progressive et irréversible de la fonction rénale → accumulation toxines urémiques</li>
                <li><strong>Surveillance essentielle</strong> : créatinine, clairance (DFG), kaliémie, phosphate, calcium, anémie</li>
                <li><strong>Objectifs du traitement</strong> : ralentir progression, corriger complications, préparer dialyse ou greffe</li>
                <li><strong>Différence principale</strong> : D01 = patient conserve fonction rénale résiduelle, D02 = dialyse nécessaire</li>
              </ul>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">📈 Stades de l'IRC (classification KDIGO)</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Stade</th>
                    <th class="border border-gray-300 p-2 text-left">DFG (mL/min/1,73m²)</th>
                    <th class="border border-gray-300 p-2 text-left">Description</th>
                    <th class="border border-gray-300 p-2 text-left">Prise en charge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>1</strong></td>
                    <td class="border border-gray-300 p-2">≥ 90</td>
                    <td class="border border-gray-300 p-2">Fonction rénale normale avec atteinte rénale</td>
                    <td class="border border-gray-300 p-2">Traitement étiologique, contrôle facteurs de risque</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>2</strong></td>
                    <td class="border border-gray-300 p-2">60-89</td>
                    <td class="border border-gray-300 p-2">IRC légère</td>
                    <td class="border border-gray-300 p-2">Ralentir progression (IEC/ARA II, contrôle TA)</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>3a</strong></td>
                    <td class="border border-gray-300 p-2">45-59</td>
                    <td class="border border-gray-300 p-2">IRC modérée</td>
                    <td class="border border-gray-300 p-2">Surveillance rapprochée, prévention complications</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>3b</strong></td>
                    <td class="border border-gray-300 p-2">30-44</td>
                    <td class="border border-gray-300 p-2">IRC modérée à sévère</td>
                    <td class="border border-gray-300 p-2">Correction anémie, troubles phospho-calciques</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>4</strong></td>
                    <td class="border border-gray-300 p-2">15-29</td>
                    <td class="border border-gray-300 p-2">IRC sévère</td>
                    <td class="border border-gray-300 p-2">Préparation dialyse, consultation néphrologique</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>5</strong></td>
                    <td class="border border-gray-300 p-2">&lt; 15</td>
                    <td class="border border-gray-300 p-2">IRC terminale (IRCT)</td>
                    <td class="border border-gray-300 p-2">⚠️ Dialyse ou transplantation rénale nécessaire</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">🏥 Manifestations cliniques de l'IRC avancée</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Syndrome urémique :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Fatigue intense, asthénie</li>
                    <li>Anorexie, nausées, vomissements</li>
                    <li>Prurit sévère (dépôts d'urée)</li>
                    <li>Haleine urémique</li>
                    <li>Troubles du sommeil, confusion (encéphalopathie urémique)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Complications cardiovasculaires :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>HTA sévère et résistante</li>
                    <li>Insuffisance cardiaque, œdèmes</li>
                    <li>Péricardite urémique</li>
                    <li>Athérosclérose accélérée</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Complications hématologiques :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Anémie normocytaire (déficit EPO)</li>
                    <li>Troubles de l'hémostase (saignements)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Complications métaboliques :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Acidose métabolique</li>
                    <li>Hyperkaliémie (risque arrêt cardiaque)</li>
                    <li>Hyperphosphatémie, hypocalcémie</li>
                    <li>Hyperparathyroïdie secondaire</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Complications osseuses :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Ostéodystrophie rénale</li>
                    <li>Douleurs osseuses, fractures</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">🔬 Bilan biologique IRC</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Fonction rénale :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Créatinine sérique ↑</strong>, urée ↑</li>
                    <li><strong>DFG ↓</strong> (calculé par CKD-EPI ou MDRD)</li>
                    <li>Protéinurie (quantitative 24h)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Ionogramme :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Hyperkaliémie</strong> (K⁺ &gt;5,5 mmol/L → urgence)</li>
                    <li>Hyponatrémie (dilution)</li>
                    <li>Acidose métabolique (HCO₃⁻ ↓)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Métabolisme phospho-calcique :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Hyperphosphatémie</strong> (PO₄³⁻ ↑)</li>
                    <li><strong>Hypocalcémie</strong> (Ca²⁺ ↓)</li>
                    <li><strong>PTH ↑</strong> (hyperparathyroïdie secondaire)</li>
                    <li>Vitamine D ↓</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Hématologie :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Anémie normocytaire normochrome</strong> (Hb &lt;10 g/dL)</li>
                    <li>Ferritine, saturation transferrine (bilan martial)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Bilan dialyse (D02) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Kt/V</strong> : indice d'efficacité dialyse (objectif ≥1,2)</li>
                    <li>Urée pré et post-dialyse</li>
                    <li>Créatinine, électrolytes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">💊 Traitement IRC non dialysée (D01)</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">1️⃣ Ralentir la progression :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>IEC ou ARA II</strong> : protection rénale (sauf IRC sévère)</li>
                    <li><strong>Contrôle strict TA</strong> : &lt;130/80 mmHg</li>
                    <li><strong>Contrôle glycémie</strong> si diabète (HbA1c &lt;7%)</li>
                    <li>Traitement étiologique (néphropathie sous-jacente)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">2️⃣ Correction complications :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Anémie</strong> : Érythropoïétine (EPO) si Hb &lt;10 g/dL + supplémentation fer IV</li>
                    <li><strong>Hyperphosphatémie</strong> : Chélateurs phosphore (carbonate de calcium, sevelamer)</li>
                    <li><strong>Hypocalcémie</strong> : Supplémentation calcium + vitamine D active</li>
                    <li><strong>Acidose</strong> : Bicarbonates de sodium si HCO₃⁻ &lt;22 mmol/L</li>
                    <li><strong>Hyperkaliémie</strong> : Régime pauvre en K⁺, résines échangeuses (Kayexalate)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">3️⃣ Mesures hygiéno-diététiques :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Régime hyposodé</strong> (&lt;5g/j) : contrôle HTA et œdèmes</li>
                    <li><strong>Régime hypoprotidique modéré</strong> : 0,8 g/kg/j (ralentir progression)</li>
                    <li><strong>Apport hydrique adapté</strong> : selon diurèse résiduelle</li>
                    <li><strong>Régime pauvre en phosphore</strong> : limiter produits laitiers, sodas</li>
                    <li><strong>Éviter néphrotoxiques</strong> : AINS, produits de contraste, aminosides</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">4️⃣ Préparation dialyse :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Consultation néphrologique régulière dès stade 4</li>
                    <li><strong>Création abord vasculaire</strong> (fistule artério-veineuse) si DFG &lt;20</li>
                    <li>Information patient sur modalités dialyse (HD, DP) et greffe</li>
                    <li>Vaccination hépatite B</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">🩺 Traitement IRC dialysée (D02)</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">1️⃣ Modalités de dialyse :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Hémodialyse (HD)</strong> : 3 séances/semaine × 4h, via fistule artério-veineuse ou cathéter central</li>
                    <li><strong>Dialyse péritonéale (DP)</strong> : Quotidienne à domicile, continue (DPCA) ou automatisée (DPA)</li>
                    <li><strong>Objectif Kt/V</strong> : ≥1,2 (efficacité épuration)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">2️⃣ Surveillance et complications :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Anémie</strong> : EPO + fer IV régulier</li>
                    <li><strong>Hyperparathyroïdie</strong> : Cinacalcet, parathyroïdectomie si sévère</li>
                    <li><strong>HTA</strong> : Contrôle poids sec, antihypertenseurs</li>
                    <li><strong>Nutrition</strong> : Régime hyperprotidique (1,2 g/kg/j) pour compenser pertes</li>
                    <li><strong>Infections</strong> : Abord vasculaire, cathéter péritonéal (péritonite)</li>
                    <li><strong>Cardiovasculaire</strong> : Surveillance ECG, échographie cardiaque</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">3️⃣ Préparation greffe rénale :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Inscription liste d'attente greffe si éligible</li>
                    <li>Bilan pré-greffe complet (cardiovasculaire, infectieux, immunologique)</li>
                    <li>Recherche donneur vivant compatible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">⚠️ Complications graves IRC</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>🚨 Hyperkaliémie sévère</strong> (&gt;6,5 mmol/L) → Risque arrêt cardiaque, dialyse urgente</li>
                <li><strong>Surcharge hydrosodée</strong> → OAP (œdème aigu pulmonaire)</li>
                <li><strong>Péricardite urémique</strong> → Indication dialyse urgente</li>
                <li><strong>Encéphalopathie urémique</strong> → Confusion, convulsions, coma</li>
                <li><strong>Acidose sévère</strong> (pH &lt;7,20) → Troubles respiratoires, cardiovasculaires</li>
                <li><strong>Anémie sévère</strong> (Hb &lt;7 g/dL) → Transfusion + EPO</li>
                <li><strong>Infections récurrentes</strong> → Immunodépression urémique</li>
              </ul>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">🎯 Surveillance recommandée</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">IRC non dialysée (D01) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Créatinine + DFG : Tous les 3-6 mois (ou plus si stade 4-5)</li>
                    <li>Ionogramme complet : Tous les 3-6 mois</li>
                    <li>Calcium, phosphore, PTH : Tous les 6 mois</li>
                    <li>Hémogramme : Tous les 6 mois</li>
                    <li>Protéinurie 24h : Tous les 6 mois</li>
                    <li>TA : À chaque consultation</li>
                    <li>Consultation néphrologique : Selon stade (mensuelle si stade 5)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">IRC dialysée (D02) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Bilan pré et post-dialyse : À chaque séance (urée, K⁺)</li>
                    <li>Bilan complet mensuel : Créatinine, ionogramme, calcium, phosphore, PTH, hémogramme</li>
                    <li>Kt/V : Mensuel (efficacité dialyse)</li>
                    <li>Surveillance abord vasculaire : À chaque séance</li>
                    <li>TA et poids sec : À chaque séance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">🔑 Points clés pour le clinicien</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🎯 <strong>Dépistage précoce IRC</strong> : créatinine + DFG chez patients à risque (diabète, HTA)</li>
                <li>💊 <strong>IEC/ARA II essentiel stades 1-3</strong> : ralentir progression (arrêt si stade 4-5)</li>
                <li>⚠️ <strong>Éviter néphrotoxiques</strong> : AINS, produits de contraste, aminosides</li>
                <li>🩺 <strong>Préparation dialyse dès stade 4</strong> : création fistule, information patient</li>
                <li>🫀 <strong>Risque cardiovasculaire majeur</strong> : surveillance ECG, échocardiographie</li>
                <li>🔬 <strong>Surveillance biologique rapprochée stade 5</strong> : prévenir urgences (hyperkaliémie, OAP)</li>
                <li>🤝 <strong>Suivi multidisciplinaire</strong> : néphrologue, diététicien, cardiologue, infirmier dialyse</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C11D01", name: "Insuffisance rénale chronique non dialysée" }, 
            { code: "C11D02", name: "Insuffisance rénale chronique dialysée" }
          ] 
        }
    ],
  },
  {
    code: "C12",
    name: "Les rhumatismes chroniques, inflammatoires",
    children: [
        { 
          code: "C12A", 
          name: "Spondylarthrite ankylosante", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-orange-800">🦴 SPONDYLARTHRITE ANKYLOSANTE (SA) – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
              <p class="text-sm mb-2">Maladie inflammatoire chronique des <strong>articulations sacro-iliaques et de la colonne vertébrale</strong>, appartenant aux spondyloarthropathies.</p>
              <p class="text-sm mb-2"><strong>Caractérisée par :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Inflammation chronique</strong> → douleur et raideur</li>
                <li><strong>Ankylose progressive</strong> → fusion vertébrale possible</li>
                <li><strong>Atteinte extra-articulaire fréquente</strong> : yeux, cœur, poumons</li>
              </ul>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Prévalence</strong> : 0,1–0,5 % de la population générale</li>
                <li><strong>Sexe masculin > féminin</strong> (3:1)</li>
                <li><strong>Début</strong> : souvent adulte jeune, <strong>15–30 ans</strong></li>
                <li><strong>Facteur génétique majeur</strong> : <strong>HLA-B27</strong> (90% des formes caucasiennes)</li>
              </ul>
            </div>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Physiopathologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Mécanismes auto-inflammatoires et génétiques</strong> : HLA-B27 favorise réponse immunitaire anormale</li>
                <li><strong>Inflammation des enthèses</strong> (points d'insertion tendineuse sur l'os) → enthésopathie → syndesmophytes</li>
                <li><strong>Progression</strong> → ossification et fusion vertébrale</li>
                <li><strong>Cytokines clés</strong> : TNF-α, IL-17, IL-23</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">4️⃣ Formes cliniques</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-green-800">A. Forme axiale (typique)</h5>
                <p class="text-sm ml-2 mb-1"><strong>Douleur lombaire chronique inflammatoire :</strong></p>
                <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>&gt;3 mois, nocturne, réveil matinal</li>
                  <li><strong>Amélioration à l'exercice</strong></li>
                  <li>Raideur matinale</li>
                  <li>Limitation des mouvements de la colonne et thorax</li>
                  <li>Sacro-iliite bilatérale ou unilatérale</li>
                </ul>
              </div>

              <div class="mb-3">
                <h5 class="font-semibold text-green-800">B. Forme périphérique</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Arthrite des articulations périphériques</strong>, surtout hanches et genoux</li>
                  <li><strong>Enthésopathies</strong> : talon, insertions ligamentaires</li>
                  <li><strong>Dactylite</strong> : doigts ou orteils en « saucisse »</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-green-800">C. Atteintes extra-articulaires</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Oculaires</strong> : uvéite antérieure aiguë (récurrente)</li>
                  <li><strong>Cardiaques</strong> : valvulopathie aortique, bloc AV</li>
                  <li><strong>Pulmonaires</strong> : fibrose apicale</li>
                  <li><strong>Digestives</strong> : association avec maladies inflammatoires chroniques de l'intestin (MICI)</li>
                </ul>
              </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Examen clinique</h4>
              <p class="text-sm mb-2"><strong>Mobilité vertébrale :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Test de Schober</strong>, expansion thoracique</li>
                <li>Douleur lombaire inflammatoire</li>
                <li>Sensibilité des enthèses</li>
                <li><strong>Signes périphériques</strong> : gonflement articulaires, dactylite</li>
              </ul>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
              
              <div class="mb-2">
                <h5 class="font-semibold text-teal-800">🔬 A. Biologie</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>VS, CRP</strong> : souvent modérément élevées</li>
                  <li><strong>HLA-B27</strong> : positif dans 80–90 % des formes caucasiennes</li>
                  <li>Biologie souvent normale sinon</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-teal-800">🔬 B. Imagerie</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Radiographie</strong> : sacro-iliite bilatérale ou unilatérale, syndesmophytes, fusion vertébrale</li>
                  <li><strong>IRM</strong> : détecte sacro-iliite précoce, inflammation active, œdème osseux</li>
                  <li><strong>Échographie</strong> : enthésopathies périphériques</li>
                </ul>
              </div>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
              <p class="text-sm mb-2"><strong>Basé sur :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Critères ASAS</strong> (Assessment of SpondyloArthritis International Society) :
                  <ul class="list-disc list-inside ml-4 text-xs">
                    <li>Douleur lombaire inflammatoire &gt;3 mois</li>
                    <li>HLA-B27</li>
                    <li>IRM positive</li>
                    <li>Manifestations extra-articulaires</li>
                  </ul>
                </li>
                <li><strong>Diagnostic différentiel</strong> : lombalgies mécaniques, arthrite psoriasique, arthrite réactive</li>
              </ul>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">8️⃣ Traitement</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💪 A. Mesures non médicamenteuses</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Exercices et kinésithérapie</strong> : mobilité colonne, posture</li>
                  <li>Éducation et ergonomie</li>
                  <li><strong>Arrêt tabac</strong> : améliore pronostic pulmonaire et progression rachidienne</li>
                </ul>
              </div>

              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💊 B. Traitement pharmacologique</h5>
                
                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">1. Anti-inflammatoires non stéroïdiens (AINS)</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>Première ligne</strong> pour douleurs et raideur</li>
                    <li>Ex : naproxène, diclofénac</li>
                  </ul>
                </div>

                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">2. Corticostéroïdes</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li>Locaux pour enthésite ou synovite périphérique</li>
                    <li>Usage systémique limité</li>
                  </ul>
                </div>

                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">3. Traitements de fond (biologiques)</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>Anti-TNFα</strong> : infliximab, adalimumab, étanercept</li>
                    <li><strong>Anti-IL-17</strong> : secukinumab</li>
                    <li><strong>Indiqués</strong> si AINS inefficaces ou atteinte sévère</li>
                  </ul>
                </div>

                <div>
                  <p class="text-sm font-semibold ml-2">4. Autres</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>Sulfasalazine</strong> : utile pour atteinte périphérique</li>
                    <li><strong>Méthotrexate</strong> : peu efficace sur atteinte axiale</li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 class="font-semibold text-cyan-800">🔪 C. Chirurgie</h5>
                <p class="text-sm ml-2">Réservée aux cas sévères : arthroplastie de hanche, correction déformation rachidienne, chirurgie de la colonne en cas d'ankylose majeure</p>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">9️⃣ Évolution et pronostic</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Progression variable</strong> : certains patients restent stables, d'autres évoluent vers ankylose</li>
                <li><strong>Facteurs de mauvais pronostic</strong> :
                  <ul class="list-disc list-inside ml-4 text-xs">
                    <li>Début jeune</li>
                    <li>Atteinte périphérique importante</li>
                    <li>CRP élevée persistante</li>
                    <li>HLA-B27 positif</li>
                  </ul>
                </li>
                <li><strong>Qualité de vie améliorée</strong> avec traitement précoce et kinésithérapie</li>
              </ul>
            </div>

            <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
              <h4 class="font-semibold text-slate-900 mb-2">🔟 Points clés pour le clinicien</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🚨 <strong>Douleur lombaire inflammatoire chronique chez jeune adulte</strong> = alerte SA</li>
                <li>🧬 <strong>HLA-B27 et imagerie (IRM)</strong> = confirmation précoce</li>
                <li>💊 <strong>Traitement</strong> : AINS → kinésithérapie → biothérapie si évolution</li>
                <li>📊 <strong>Surveillance</strong> : mobilité rachidienne, atteintes extra-articulaires, complications cardiovasculaires et pulmonaires</li>
              </ul>
            </div>

            <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">🎯 Signes d'alerte diagnostique</h4>
              <div class="space-y-1 text-sm">
                <div class="bg-white p-2 rounded border border-blue-200">
                  <p><strong>🔴 Douleur lombaire inflammatoire</strong></p>
                  <p class="text-xs ml-2">→ Durée &gt;3 mois, début &lt;40 ans</p>
                  <p class="text-xs ml-2">→ Nocturne, réveil matinal (2ème moitié nuit)</p>
                  <p class="text-xs ml-2">→ <strong>Amélioration à l'exercice</strong> (contrairement aux douleurs mécaniques)</p>
                  <p class="text-xs ml-2">→ Raideur matinale &gt;30 min</p>
                </div>
                <div class="bg-white p-2 rounded border border-blue-200">
                  <p><strong>🔴 Critères d'orientation</strong></p>
                  <p class="text-xs ml-2">→ Âge jeune (15-30 ans)</p>
                  <p class="text-xs ml-2">→ Antécédents familiaux de spondyloarthropathies</p>
                  <p class="text-xs ml-2">→ Uvéite récurrente</p>
                  <p class="text-xs ml-2">→ Enthésopathies (talalgies, dactylite)</p>
                  <p class="text-xs ml-2">→ MICI associées</p>
                </div>
              </div>
            </div>

            <div class="bg-green-100 border-l-4 border-green-600 p-3">
              <h4 class="font-semibold text-green-900 mb-2">📋 Suivi recommandé</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Examen clinique</strong> : Tous les 3-6 mois (mobilité rachidienne, test de Schober, expansion thoracique)</li>
                <li><strong>Biologie</strong> : VS, CRP tous les 3-6 mois</li>
                <li><strong>Imagerie</strong> : Radiographie colonne/sacro-iliaques tous les 2 ans, IRM si poussée</li>
                <li><strong>Dépistage complications</strong> : Fond d'œil annuel, échographie cardiaque si souffle, EFR si symptômes pulmonaires</li>
                <li><strong>Évaluation activité maladie</strong> : Scores BASDAI, ASDAS</li>
                <li><strong>Kinésithérapie</strong> : Régulière et continue</li>
              </ul>
            </div>
          </div>`,
          children: [
            { code: "C12A01", name: "Spondylarthrite ankylosante" }
          ] 
        },
        { 
          code: "C12B", 
          name: "Polyarthrite rhumatoïde", 
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-red-800">🤲 POLYARTHRITE RHUMATOÏDE (PR) – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
              <p class="text-sm mb-2">Maladie inflammatoire chronique <strong>auto-immune</strong> touchant principalement les <strong>articulations synoviales</strong>, entraînant déformation et destruction articulaire.</p>
              <p class="text-sm">Évolution progressive avec <strong>poussées</strong> et périodes de <strong>rémission</strong>.</p>
            </div>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">2️⃣ Classification</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Code</th>
                    <th class="border border-gray-300 p-2 text-left">Type</th>
                    <th class="border border-gray-300 p-2 text-left">Caractéristiques principales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>B01</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Polyarthrite rhumatoïde séropositive</strong></td>
                    <td class="border border-gray-300 p-2">Présence d'anticorps <strong>anti-CCP</strong> et/ou <strong>facteur rhumatoïde (FR)</strong> positif ; évolution plus sévère, atteinte articulaire symétrique prédominante</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>B02</strong></td>
                    <td class="border border-gray-300 p-2"><strong>Polyarthrite rhumatoïde séronégative</strong></td>
                    <td class="border border-gray-300 p-2">FR et anti-CCP négatifs ; évolution souvent plus bénigne, atteinte articulaire parfois asymétrique ou moins sévère</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">3️⃣ Épidémiologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Prévalence</strong> : 0,5–1 % de la population adulte</li>
                <li><strong>Femmes > hommes</strong> (3:1)</li>
                <li><strong>Début typique</strong> : 35–50 ans</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">4️⃣ Physiopathologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Auto-immunité</strong> : production d'auto-anticorps → inflammation synoviale</li>
                <li><strong>Infiltration de la synoviale</strong> par lymphocytes T et B → <strong>pannus</strong></li>
                <li><strong>Dégradation du cartilage et os sous-jacent</strong> par cytokines pro-inflammatoires (TNF-α, IL-1, IL-6)</li>
                <li><strong>Facteurs génétiques</strong> : HLA-DR4, tabac</li>
              </ul>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Manifestations cliniques</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-yellow-800">A. Articulations</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Polyarthrite symétrique</strong> : poignets, MCP (métacarpo-phalangiennes), PIP (inter-phalangiennes proximales), genoux, chevilles</li>
                  <li><strong>Raideur matinale &gt; 1h</strong></li>
                  <li>Gonflement, douleur, chaleur locale</li>
                  <li><strong>Déformations chroniques</strong> :
                    <ul class="list-disc list-inside ml-4 text-xs">
                      <li>Doigts en boutonnière</li>
                      <li>Col de cygne (swan neck)</li>
                      <li>Subluxations</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-yellow-800">B. Signes systémiques</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Fatigue, fièvre basse, perte de poids</li>
                  <li><strong>Nodules rhumatoïdes sous-cutanés</strong> (coudes, doigts)</li>
                  <li><strong>Atteintes extra-articulaires</strong> :
                    <ul class="list-disc list-inside ml-4 text-xs">
                      <li>Poumons : fibrose, pleurite</li>
                      <li>Cœur : péricardite</li>
                      <li>Yeux : sclérite</li>
                      <li>Anémie inflammatoire</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
              
              <div class="mb-2">
                <h5 class="font-semibold text-teal-800">🔬 Biologie :</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>FR (Facteur Rhumatoïde)</strong> : positif chez 70–80 % (séropositive)</li>
                  <li><strong>Anti-CCP</strong> : haute spécificité pour PR</li>
                  <li><strong>VS, CRP</strong> : inflammation active</li>
                </ul>
              </div>

              <div>
                <h5 class="font-semibold text-teal-800">📸 Imagerie :</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong>Radiographies</strong> : érosions articulaires, pincement interligne</li>
                  <li><strong>Échographie / IRM</strong> : synovite précoce, épanchement</li>
                </ul>
              </div>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
              <p class="text-sm mb-2"><strong>Selon critères ACR/EULAR 2010 :</strong> score ≥ 6/10 basé sur</p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Nombre et type d'articulations touchées</strong></li>
                <li><strong>Séropositivité</strong> (FR et anti-CCP)</li>
                <li><strong>Inflammation systémique</strong> (VS/CRP)</li>
                <li><strong>Durée symptômes ≥ 6 semaines</strong></li>
              </ul>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">8️⃣ Traitement</h4>
              
              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💪 A. Mesures générales</h5>
                <ul class="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Éducation patient, repos articulaires lors poussées</li>
                  <li><strong>Kinésithérapie</strong> pour maintien mobilité et force</li>
                </ul>
              </div>

              <div class="mb-3">
                <h5 class="font-semibold text-cyan-800">💊 B. Traitement pharmacologique</h5>
                
                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">1. Anti-inflammatoires</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>AINS</strong> pour douleur et raideur</li>
                  </ul>
                </div>

                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">2. Corticostéroïdes</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li>Pour poussées sévères ou bridge jusqu'aux DMARD</li>
                  </ul>
                </div>

                <div class="mb-2">
                  <p class="text-sm font-semibold ml-2">3. DMARD (Disease Modifying Anti-Rheumatic Drugs)</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>Méthotrexate</strong> (1ère ligne)</li>
                    <li>Sulfasalazine, léflunomide</li>
                  </ul>
                </div>

                <div>
                  <p class="text-sm font-semibold ml-2">4. Biothérapies (si PR sévère ou résistante)</p>
                  <ul class="list-disc list-inside space-y-1 text-xs ml-4">
                    <li><strong>Anti-TNFα</strong> : infliximab, adalimumab, étanercept</li>
                    <li><strong>Anti-IL-6</strong> : tocilizumab</li>
                    <li><strong>Rituximab</strong> (anti-CD20)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 class="font-semibold text-cyan-800">🔪 C. Chirurgie</h5>
                <p class="text-sm ml-2">Réparation ou remplacement articulaire en cas de déformations ou destruction avancée</p>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">9️⃣ Évolution et pronostic</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Dépend de</strong> : séropositivité, sévérité initiale, traitement précoce</li>
                <li><strong>Séropositive</strong> : évolution souvent plus agressive, atteinte articulaire majeure</li>
                <li><strong>Complications</strong> :
                  <ul class="list-disc list-inside ml-4 text-xs">
                    <li>Destruction articulaire, invalidité</li>
                    <li>Atteinte viscérale</li>
                    <li>Comorbidités cardiovasculaires</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
              <h4 class="font-semibold text-slate-900 mb-2">🔟 Points clés</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🎯 <strong>PR = polyarthrite symétrique chronique, auto-immune</strong></li>
                <li>⚠️ <strong>Séropositif → plus sévère</strong>, risque érosions plus important</li>
                <li>⏰ <strong>Diagnostic précoce et traitement agressif</strong> améliore pronostic fonctionnel</li>
                <li>📊 <strong>Surveillance régulière</strong> : fonction articulaire, imagerie, complications médicamenteuses</li>
              </ul>
            </div>

            <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">🎯 Critères diagnostiques ACR/EULAR 2010</h4>
              <p class="text-sm mb-2"><strong>Score ≥ 6/10 points = Polyarthrite rhumatoïde</strong></p>
              <table class="w-full text-xs border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Critère</th>
                    <th class="border border-gray-300 p-2 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>A. Atteinte articulaire</strong></td>
                    <td class="border border-gray-300 p-2"></td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">1 grosse articulation</td>
                    <td class="border border-gray-300 p-2">0</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 pl-4">2-10 grosses articulations</td>
                    <td class="border border-gray-300 p-2">1</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">1-3 petites articulations</td>
                    <td class="border border-gray-300 p-2">2</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 pl-4">4-10 petites articulations</td>
                    <td class="border border-gray-300 p-2">3</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">&gt;10 articulations (dont ≥1 petite)</td>
                    <td class="border border-gray-300 p-2">5</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>B. Sérologie</strong></td>
                    <td class="border border-gray-300 p-2"></td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">FR et anti-CCP négatifs</td>
                    <td class="border border-gray-300 p-2">0</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 pl-4">FR ou anti-CCP faiblement positif</td>
                    <td class="border border-gray-300 p-2">2</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">FR ou anti-CCP fortement positif</td>
                    <td class="border border-gray-300 p-2">3</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>C. Marqueurs inflammatoires</strong></td>
                    <td class="border border-gray-300 p-2"></td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">VS et CRP normales</td>
                    <td class="border border-gray-300 p-2">0</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 pl-4">VS ou CRP élevée</td>
                    <td class="border border-gray-300 p-2">1</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>D. Durée des symptômes</strong></td>
                    <td class="border border-gray-300 p-2"></td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 pl-4">&lt;6 semaines</td>
                    <td class="border border-gray-300 p-2">0</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 pl-4">≥6 semaines</td>
                    <td class="border border-gray-300 p-2">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-green-100 border-l-4 border-green-600 p-3">
              <h4 class="font-semibold text-green-900 mb-2">📋 Surveillance recommandée</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Clinique</strong> : Tous les 1-3 mois (nombre articulations gonflées/douloureuses, fonction, DAS28)</li>
                <li><strong>Biologie</strong> : VS, CRP tous les 3 mois, NFS (méthotrexate)</li>
                <li><strong>Imagerie</strong> : Radiographies mains/pieds annuelles, échographie si doute synovite</li>
                <li><strong>Surveillance méthotrexate</strong> : Bilan hépatique, rénal tous les 3 mois, NFS</li>
                <li><strong>Dépistage complications</strong> : Cardiovasculaire, ostéoporose, infections</li>
                <li><strong>Évaluation activité</strong> : DAS28, HAQ (Health Assessment Questionnaire)</li>
              </ul>
            </div>

            <div class="bg-yellow-100 border-l-4 border-yellow-600 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">⚠️ Effets secondaires traitements</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Méthotrexate :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Hépatotoxicité, pneumopathie, nausées</li>
                    <li>Supplémentation acide folique obligatoire</li>
                    <li>Contraception efficace (tératogène)</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Biothérapies (anti-TNF, anti-IL-6) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>⚠️ Risque infections sévères (tuberculose, infections opportunistes)</li>
                    <li>Dépistage tuberculose avant initiation</li>
                    <li>Surveillance infections, vaccinations à jour</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Corticoïdes (long terme) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Ostéoporose, HTA, diabète, cushing</li>
                    <li>Utilisation minimale dose/durée</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`,
          children: [
            { code: "C12B01", name: "Polyarthrite rhumatoïde séropositive" }, 
            { code: "C12B02", name: "Polyarthrite rhumatoïde séronégative" }
          ] 
        },
        { code: "C12C", name: "Arthroses graves", children: [{ code: "C12C01", name: "Coxarthrose grave" }, { code: "C12C02", name: "Gonarthrose grave" }, { code: "C12C03", name: "Spondylarthrose grave" }, { code: "C12C04", name: "Omarthrose grave" }, { code: "C12C05", name: "Autres arthroses graves" }] }
    ],
  },
  {
    code: "C13",
    name: "Périartérite noueuse",
    tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-red-700">🩸 PÉRIARTÉRITE NOUEUSE (PAN)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET CLASSIFICATION</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Définition</p>
              <p class="text-xs"><strong>Vascularite nécrosante</strong> touchant artères de <strong>moyen calibre</strong> (viscérales) et <strong>petit calibre</strong></p>
            </div>
            
            <div class="bg-green-50 p-2 rounded border border-green-400">
              <p class="font-semibold text-green-800 text-xs mb-1">✅ Caractéristique Majeure (Chapel Hill 2012)</p>
              <p class="text-xs"><strong>ÉPARGNE</strong> les glomérules rénaux et capillaires pulmonaires</p>
              <p class="text-xs mt-1 text-green-700"><strong>→ PAS de glomérulonéphrite</strong> (≠ Polyangéite Microscopique)</p>
            </div>
            
            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">🔬 Formes :</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>PAN Idiopathique</strong> : Forme la plus fréquente aujourd'hui</li>
                <li><strong>PAN associée VHB</strong> (Hépatite B) : Forme historique (complexes immuns), devenue <strong>rare</strong> (vaccination)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ PHYSIOPATHOLOGIE</h4>
          <p class="text-sm mb-2"><strong>Inflammation transmurale</strong> de la paroi artérielle :</p>
          
          <div class="bg-white p-2 rounded text-xs">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Nécrose fibrinoïde</strong> : Fragilisation paroi → Formation <strong>micro-anévrysmes</strong> (aspect noueux)</li>
              <li><strong>Thrombose</strong> : Occlusion lumière → <strong>Ischémie et infarctus</strong> tissulaire en aval</li>
              <li><strong>Cicatrisation</strong> : Fibrose et sténose</li>
            </ul>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ PRÉSENTATION CLINIQUE</h4>
          <p class="text-sm italic mb-2">⚠️ Tableau souvent <strong>BRUYANT</strong> : Fièvre + Amaigrissement important</p>
          
          <div class="space-y-2">
            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 mb-1">A. Signes Neurologiques (60-70%) - SOUVENT RÉVÉLATEURS</p>
              <p class="text-xs mb-1"><strong>Multinévrite (Mononeuropathy Multiplex)</strong> : Atteinte <strong>asymétrique, distale, déficitaire</strong></p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Exemple typique</strong> : Déficit releveur pied (SPE) d'un côté → puis atteinte cubitale de l'autre</li>
                <li>C'est souvent le <strong>symptôme qui amène au diagnostic</strong></li>
              </ul>
            </div>

            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 mb-1">B. Signes Cutanés (50%)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Nodules sous-cutanés</strong> : Petites boules dures, douloureuses, sur trajet artères (jambes, avant-bras)</li>
                <li><strong>Livedo Racemosa</strong> : Mailles larges, ouvertes, "brisées" (membres/tronc)</li>
                <li><strong>Gangrène distale</strong> : Orteils/doigts</li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800 mb-1">C. Signes Rénaux (Vasculaires)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>HTA</strong> : Souvent maligne/sévère (ischémie rénale → activation Rénine-Angiotensine)</li>
                <li><strong>Insuffisance rénale</strong></li>
                <li><strong>Infarctus rénal</strong> : Douleur lombaire brutale + hématurie macroscopique</li>
                <li class="text-green-700 font-semibold">✅ Rappel : <strong>PAS de glomérulonéphrite</strong> (BU normale ou protéinurie faible)</li>
              </ul>
            </div>

            <div class="bg-pink-100 p-2 rounded">
              <p class="font-semibold text-pink-800 mb-1">D. Autres Atteintes</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Digestives</strong> : "Angor intestinal" (douleurs post-prandiales), hémorragies digestives, perforations</li>
                <li><strong>Orchite</strong> : Douleur testiculaire unilatérale (<strong>très évocatrice</strong> chez homme jeune)</li>
                <li><strong>Arthromyalgies</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">4️⃣ DIAGNOSTIC PARACLINIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-orange-700 mb-1">A. Biologie</p>
              <ul class="list-disc ml-5 text-sm space-y-1">
                <li><strong>Syndrome inflammatoire franc</strong> : VS et CRP très élevées</li>
                <li class="bg-green-50 p-1 rounded"><strong>ANCA</strong> (Anti-Neutrophil Cytoplasmic Antibodies) : <span class="text-green-700 font-bold">Typiquement NÉGATIFS</span>
                  <ul class="list-circle ml-4 text-xs">
                    <li>⚠️ Si ANCA+ (surtout anti-MPO) → Reconsidérer diagnostic vers <strong>Polyangéite Microscopique</strong></li>
                  </ul>
                </li>
                <li><strong>Sérologies virales</strong> : VHB (Ag HBs), VHC, VIH <strong>SYSTÉMATIQUES</strong></li>
              </ul>
            </div>

            <div class="bg-purple-100 p-2 rounded border-2 border-purple-500">
              <p class="font-semibold text-purple-800 mb-1">B. Artériographie (Mésentérique et Rénale)</p>
              <p class="text-xs italic mb-1">Indiquée si biopsie impossible ou négative</p>
              <p class="text-xs"><strong>Image TYPIQUE</strong> : Multiples <strong>micro-anévrysmes</strong> (aspect en <strong>"chapelet"</strong> ou <strong>"collier de perles"</strong>) + sténoses artérielles</p>
            </div>

            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 mb-1">C. Histologie (Biopsie) - GOLD STANDARD</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Site</strong> : Prélever site symptomatique (nodule cutané, muscle douloureux, nerf sural si neuropathie)</li>
                <li><strong>Résultat</strong> : <strong>Vascularite nécrosante</strong> avec infiltrat inflammatoire <strong>pan-mural</strong> (toutes couches artère)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ CRITÈRES ACR (1990)</h4>
          <p class="text-sm italic mb-2">📊 Diagnostic si <strong>≥ 3 critères</strong> (Sensibilité 82%, Spécificité 86%)</p>
          
          <div class="bg-white p-2 rounded text-xs">
            <ul class="list-disc ml-5 space-y-1">
              <li>1. Perte de poids &gt; 4 kg</li>
              <li>2. Livedo reticularis</li>
              <li>3. Douleurs testiculaires</li>
              <li>4. Myalgies ou faiblesse membres inférieurs</li>
              <li>5. Mononeuropathie ou polyneuropathie</li>
              <li>6. HTA diastolique &gt; 90 mmHg</li>
              <li>7. Élévation créatinine ou urée</li>
              <li>8. Virus Hépatite B (Ag ou Ac)</li>
              <li>9. Anomalies artériographiques (Anévrysmes)</li>
              <li>10. Biopsie (PMN dans paroi artérielle)</li>
            </ul>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">6️⃣ DIAGNOSTIC DIFFÉRENTIEL</h4>
          
          <div class="bg-white p-2 rounded text-sm">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Polyangéite Microscopique (PAM)</strong> :
                <ul class="list-circle ml-4 text-xs">
                  <li>Petits vaisseaux, ANCA+ (p-ANCA), <strong>Glomérulonéphrite présente</strong></li>
                </ul>
              </li>
              <li><strong>Granulomatose avec Polyangéite (Wegener)</strong> :
                <ul class="list-circle ml-4 text-xs">
                  <li>ANCA+ (c-ANCA), Atteinte ORL et pulmonaire</li>
                </ul>
              </li>
              <li><strong>Embolies de Cholestérol</strong> :
                <ul class="list-circle ml-4 text-xs">
                  <li>Post-cathétérisme (sujet athéromateux)</li>
                  <li>Orteils pourpres, IR, livedo</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">7️⃣ STRATÉGIE THÉRAPEUTIQUE</h4>
          <p class="text-sm font-bold text-red-700 mb-2">⚠️ Traitement dépend IMPÉRATIVEMENT de l'étiologie (Virale vs Idiopathique)</p>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 mb-1">A. PAN Idiopathique (Non virale)</p>
              <p class="text-xs italic mb-1">💊 Traitement immunosuppresseur classique</p>
              
              <ul class="list-disc ml-5 text-sm space-y-1">
                <li><strong>Formes légères</strong> (sans facteur gravité) :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Corticothérapie seule (Prednisone 1 mg/kg/j)</li>
                  </ul>
                </li>
                <li><strong>Formes sévères</strong> (Score FFS ≥ 1) :
                  <ul class="list-circle ml-4 text-xs">
                    <li>Corticothérapie + Bolus <strong>Cyclophosphamide</strong> (Endoxan)</li>
                    <li>OU <strong>Rituximab</strong></li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-yellow-100 p-2 rounded border-2 border-yellow-600">
              <p class="font-semibold text-yellow-800 mb-1">B. PAN Associée VHB (Hépatite B)</p>
              <p class="text-xs text-red-700 font-bold mb-1">⚠️ NE PAS donner immunosuppresseurs au long cours (risque flambée virale)</p>
              
              <div class="bg-white p-2 rounded mt-1">
                <p class="text-xs font-semibold mb-1">🔺 Stratégie TRIPTYQUE :</p>
                <ul class="list-disc ml-5 text-xs space-y-1">
                  <li><strong>1. Corticothérapie courte</strong> : Contrôler inflammation aiguë</li>
                  <li><strong>2. Échanges Plasmatiques (Plasmaphérèse)</strong> : Épurer complexes immuns circulants</li>
                  <li><strong>3. Antiviral</strong> : Analogue nucléosidique (<strong>Entecavir</strong> ou <strong>Tenofovir</strong>) → Bloquer réplication virale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
          <h4 class="font-semibold text-indigo-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🩸 <strong>Vascularite artères moyen calibre</strong> : ÉPARGNE glomérules (PAS de glomérulonéphrite)</li>
              <li>🦵 <strong>Multinévrite</strong> (60-70%) : Symptôme révélateur (mononeuropathy multiplex asymétrique)</li>
              <li>🔴 <strong>Livedo racemosa</strong> + Nodules sous-cutanés (50%)</li>
              <li>💉 <strong>HTA sévère</strong> + IR (ischémie rénale) mais BU normale</li>
              <li>🧪 <strong>ANCA NÉGATIFS</strong> (si +, penser Polyangéite Microscopique)</li>
              <li>📸 <strong>Artériographie</strong> : Micro-anévrysmes "chapelet/collier de perles"</li>
              <li>🔬 <strong>Biopsie</strong> : Gold standard (vascularite nécrosante pan-murale)</li>
              <li>📋 <strong>Critères ACR</strong> : ≥3/10 critères (82% sensibilité)</li>
              <li>💊 <strong>PAN Idiopathique</strong> : Corticoïdes ± Cyclophosphamide/Rituximab (FFS ≥1)</li>
              <li>🦠 <strong>PAN VHB</strong> : Triptyque (Corticoïdes courts + Plasmaphérèse + Antiviraux)</li>
            </ul>
          </div>
        </div>
      </div>`,
    children: [
        { 
          code: "C13A", 
          name: "Périartérite noueuse idiopathique",
          tooltip: `<div class="space-y-3">
            <h3 class="text-lg font-bold text-purple-800">🩸 PÉRIARTÉRITE NOUEUSE (PAN) IDIOPATHIQUE – FICHE SYNTHÉTIQUE</h3>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
              <p class="text-sm mb-2">Maladie systémique rare, <strong>vasculite des artères de moyen calibre</strong>, sans atteinte prédominante des petits vaisseaux capillaires ou glomérulaires.</p>
              <p class="text-sm mb-2">La <strong>forme idiopathique</strong> correspond à la PAN <strong>non associée à l'hépatite B</strong>.</p>
              <p class="text-sm">Provoque <strong>inflammation segmentaire et noduleuse</strong> de la paroi artérielle → sténoses, thromboses, infarctus tissulaire.</p>
            </div>

            <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Rare</strong> : incidence ~3–4/1 000 000/an</li>
                <li><strong>Pic</strong> : 4ᵉ–6ᵉ décennie</li>
                <li><strong>Sexe</strong> : hommes > femmes (~1,5–2:1)</li>
                <li>PAN post‑hépatite B a beaucoup <strong>régressé depuis vaccination HBV</strong></li>
              </ul>
            </div>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
              <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Physiopathologie</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Inflammation</strong> granulomateuse non granulomateuse de la paroi artérielle</li>
                <li><strong>Infiltrat</strong> : neutrophiles → monocytes → destruction élastique et fibreuse de la média</li>
                <li><strong>Segmentaire</strong> : atteinte d'un tronçon d'artère, respectant la continuité</li>
                <li><strong>Complications</strong> : thrombose, anévrysmes, infarctus tissulaire</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">4️⃣ Sites d'atteinte</h4>
              <p class="text-sm mb-2"><strong>Systèmes les plus touchés :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>🫘 Rein</strong> : infarctus rénaux, HTA (souvent sévère, réno-vasculaire)</li>
                <li><strong>🔴 Peau</strong> : nodules, livedo reticularis, ulcérations, purpura palpable</li>
                <li><strong>🧠 Neurologie périphérique</strong> : mononeuropathies multiplex (atteinte asymétrique)</li>
                <li><strong>🫄 Système digestif</strong> : douleurs abdominales post-prandiales, infarctus intestinal, perforation</li>
                <li><strong>💪 Muscles et articulations</strong> : myalgies, arthralgies</li>
                <li><strong>🫁 Système pulmonaire</strong> : rarement touché, contrairement aux autres vasculites (ex. GPA)</li>
              </ul>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Clinique</h4>
              
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">🌡️ A. Signes généraux</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Fièvre, asthénie, amaigrissement</li>
                    <li>Sueurs nocturnes, anorexie</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">🔴 B. Signes cutanés</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Nodules sous-cutanés</strong>, parfois douloureux</li>
                    <li>Purpura palpable, <strong>livedo reticularis</strong>, ulcérations</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">💪 C. Atteinte neuromusculaire</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Mononeuropathie multiplex</strong> : asymétrique, douleur et déficit moteur</li>
                    <li>Myalgies diffuses ou localisées</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">🫀 D. Atteinte viscérale</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Rénale</strong> : HTA, protéinurie modérée, insuffisance rénale par infarctus</li>
                    <li><strong>Digestive</strong> : douleurs abdominales, diarrhée, nécrose intestinale</li>
                    <li><strong>Rare</strong> : myocardite, péricardite</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
              <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
              
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">🔬 A. Biologie</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Inflammation</strong> : VS, CRP ↑</li>
                    <li><strong>NFS</strong> : leucocytose, anémie inflammatoire</li>
                    <li><strong>⭐ Pas d'auto-anticorps spécifiques</strong> (<strong>ANCA typiquement négatifs</strong> → différencier des autres vasculites)</li>
                    <li><strong>Fonction rénale</strong> : créatinine, protéinurie</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">📸 B. Imagerie</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Angiographie (CT ou IRM)</strong> :</li>
                    <li class="ml-4">Sténoses segmentaires, <strong>anévrismes artériels multiples</strong>, infarctus organique</li>
                    <li><strong>Échographie Doppler</strong> : pour certaines artères périphériques</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">🔬 C. Biopsie</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Biopsie tissulaire</strong> (peau, nerf, muscle) :</li>
                    <li class="ml-4">Inflammation segmentaire, transmural, fibrinoïde</li>
                    <li class="ml-4">Thrombose et nécrose de la média</li>
                    <li class="ml-4">Absence de granulomes typiques</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
              <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
              <p class="text-sm mb-2"><strong>Critères ACR 1990 pour PAN (≥3/10) :</strong></p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Perte de poids >4 kg</li>
                <li><strong>Livedo reticularis</strong></li>
                <li>Douleurs testiculaires ou arthralgies/musculaires</li>
                <li><strong>Mononeuropathie ou polyneuropathie</strong></li>
                <li>Hypertension</li>
                <li>Créatinine ↑ ou protéinurie modérée</li>
                <li>Présence d'hépatite B (à <strong>exclure pour PAN idiopathique</strong>)</li>
                <li><strong>Angiographie typique</strong> (anévrismes ou sténoses)</li>
                <li><strong>Biopsie artérielle</strong> montrant inflammation segmentaire</li>
                <li>Autres signes viscéraux (intestins, reins, cœur)</li>
              </ul>
              <p class="text-sm mt-2">⚠️ <strong>Exclusion</strong> : ANCA positif → envisager autres vasculites (microscopique, GPA)</p>
            </div>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <h4 class="font-semibold text-cyan-900 mb-2">8️⃣ Formes cliniques</h4>
              <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Forme</th>
                    <th class="border border-gray-300 p-2 text-left">Caractéristiques</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Systémique complète</strong></td>
                    <td class="border border-gray-300 p-2">Fièvre, atteinte viscérale multiple, inflammation biologique marquée</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Cutaneo‑articulaire</strong></td>
                    <td class="border border-gray-300 p-2">Nodules, purpura, arthralgies, pas de viscères atteints</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2"><strong>Neurologique isolée</strong></td>
                    <td class="border border-gray-300 p-2">Mononeuropathie multiplex, souvent début subaigu</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2"><strong>Rénale dominante</strong></td>
                    <td class="border border-gray-300 p-2">HTA sévère, infarctus rénaux</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-3">
              <h4 class="font-semibold text-green-900 mb-2">9️⃣ Traitement</h4>
              
              <div class="space-y-3 text-sm">
                <div>
                  <p class="font-semibold">💊 A. Médical</p>
                  
                  <div class="ml-2 mt-2 space-y-2">
                    <div class="bg-white p-2 rounded border border-green-200">
                      <p class="font-semibold text-xs">⭐ Corticostéroïdes :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>1 mg/kg/jour prednisone</strong> (poussée initiale)</li>
                        <li>Décroissance progressive</li>
                      </ul>
                    </div>
                    
                    <div class="bg-white p-2 rounded border border-green-200">
                      <p class="font-semibold text-xs">💉 Immunosuppresseurs (si atteinte viscérale sévère) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Cyclophosphamide</strong> IV ou oral (atteinte rénale, intestinale, neurologique grave)</li>
                        <li><strong>Méthotrexate, azathioprine</strong> (formes modérées)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="font-semibold">🩹 B. Prise en charge symptomatique</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Analgésie pour douleurs</li>
                    <li>Contrôle HTA et insuffisance rénale</li>
                    <li>Nutrition et surveillance infection</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold">🦠 C. PAN post‑HBV</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Traitement antiviral + plasma exchange (<strong>non applicable pour idiopathique</strong>)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border-l-4 border-red-500 p-3">
              <h4 class="font-semibold text-red-900 mb-2">🔟 Évolution et pronostic</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>⚠️ <strong>Sans traitement</strong> : mortalité élevée (~80 % à 5 ans dans PAN systémique)</li>
                <li>✅ <strong>Avec traitement</strong> : survie 5 ans >70–80 % si début précoce</li>
                <li><strong>Facteurs péjoratifs</strong> : atteinte rénale sévère, infarctus digestif, myocardite, âge avancé</li>
                <li><strong>Récidives possibles</strong> → suivi prolongé indispensable</li>
              </ul>
            </div>

            <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
              <h4 class="font-semibold text-blue-900 mb-2">1️⃣1️⃣ Points clés</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>🩸 <strong>PAN idiopathique</strong> = vasculite segmentaire artères de moyen calibre, sans HBV, <strong>ANCA négatifs</strong></li>
                <li>🚨 <strong>Tableau multisystémique</strong> : cutané, neuro, viscéral</li>
                <li>🎯 <strong>Angiographie et biopsie</strong> = confirmation</li>
                <li>💊 <strong>Traitement</strong> : corticostéroïdes ± immunosuppresseurs selon gravité</li>
                <li>📊 <strong>Pronostic</strong> dépend de l'atteinte viscérale et de la précocité du traitement</li>
              </ul>
            </div>

            <div class="bg-yellow-100 border-l-4 border-yellow-600 p-3">
              <h4 class="font-semibold text-yellow-900 mb-2">📋 Surveillance recommandée</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Suivi clinique (tous les 1-3 mois en phase active) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Signes généraux : fièvre, perte de poids</li>
                    <li>Examen cutané : nodules, livedo, purpura</li>
                    <li>Examen neurologique : mononeuropathie</li>
                    <li>TA : HTA réno-vasculaire</li>
                    <li>Douleurs abdominales</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Biologie (tous les 1-3 mois) :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>VS, CRP (activité inflammation)</li>
                    <li>NFS complète</li>
                    <li>Fonction rénale : créatinine, protéinurie</li>
                    <li>Bilan hépatique</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Imagerie :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Angiographie : tous les 6-12 mois ou si rechute suspectée</li>
                    <li>Échographie Doppler : selon atteinte vasculaire</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Dépistage complications traitement :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Effets corticostéroïdes : glycémie, ostéoporose, infections</li>
                    <li>Toxicité cyclophosphamide : NFS, cytologie urinaire</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-100 border-l-4 border-purple-600 p-3">
              <h4 class="font-semibold text-purple-900 mb-2">⚠️ Diagnostic différentiel</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <p class="font-semibold">Autres vasculites :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li><strong>Granulomatose avec polyangéite (GPA)</strong> : ANCA+, atteinte pulmonaire/ORL</li>
                    <li><strong>Polyangéite microscopique</strong> : ANCA+, glomérulonéphrite</li>
                    <li><strong>Maladie de Kawasaki</strong> : enfant, artères coronaires</li>
                  </ul>
                </div>
                <div>
                  <p class="font-semibold">Autres causes mononeuropathie multiplex :</p>
                  <ul class="list-disc list-inside ml-2 text-xs">
                    <li>Diabète</li>
                    <li>Sarcoïdose</li>
                    <li>Lèpre</li>
                    <li>Lymphome</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`,
          children: [{ code: "C13A01", name: "Périartérite noueuse idiopathique" }] 
        },
        { code: "C13B", name: "Périartérite noueuse liée au virus de l'Hépatite B", children: [{ code: "C13B01", name: "Périartérite noueuse liée au virus de l'Hépatite B" }] },
        { code: "C13C", name: "Autres formes de périartérite noueuse", children: [{ code: "C13C01", name: "Autres formes de Périartérite noueuse" }] }
    ],
  },
  {
    code: "C14",
    name: "Lupus érythémateux disséminé (LED)",
    tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-purple-700">🦋 LUPUS ÉRYTHÉMATEUX DISSÉMINÉ (LED)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET ÉPIDÉMIOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Nature</p>
              <p class="text-xs">Maladie <strong>auto-immune chronique non spécifique d'organe</strong> : Production anticorps antinucléaires + Dépôts complexes immuns</p>
            </div>
            
            <div class="bg-pink-50 p-2 rounded border border-pink-400">
              <p class="font-semibold text-pink-800 text-xs mb-1">👥 Épidémiologie</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Terrain</strong> : Prédominance féminine <strong>MASSIVE</strong> (Sex-ratio <strong>9:1</strong>)</li>
                <li><strong>Âge</strong> : Pic 15-45 ans (période activité ovarienne)</li>
                <li><strong>Ethnie</strong> : Formes plus fréquentes et sévères (ascendance africaine, asiatique, hispanique)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ PHYSIOPATHOLOGIE (Mécanismes Clés)</h4>
          
          <div class="bg-white p-2 rounded text-xs">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Défaut clairance apoptose</strong> : Débris cellulaires (ADN, nucléosomes) non éliminés → Exposés au système immunitaire</li>
              <li><strong>Rupture tolérance</strong> : Activation Lymphocytes B autoréactifs → Production auto-anticorps (AAN)</li>
              <li><strong>Signature Interféron</strong> : Surproduction majeure <strong>Interféron type I</strong> (cytokine clé inflammation lupique)</li>
              <li><strong>Dépôts complexes immuns</strong> : Petits vaisseaux (peau, rein, articulations) → Activation Complément → Lésions (Hypersensibilité type III)</li>
            </ul>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ PRÉSENTATION CLINIQUE (Polymorphisme)</h4>
          <p class="text-sm italic mb-2">⚠️ Peut toucher presque tous les organes - Évolution par <strong>poussées et rémissions</strong></p>
          
          <div class="space-y-2">
            <div class="bg-gray-100 p-2 rounded">
              <p class="font-semibold text-gray-800 text-xs mb-1">A. Signes Généraux</p>
              <p class="text-xs">Fièvre inexpliquée, asthénie profonde, amaigrissement</p>
            </div>

            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">B. Atteinte Dermatologique (80%)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Lupus Aigu</strong> : Érythème en <strong>"Vespertilio"</strong> (Ailes de papillon) sur visage, <strong>respectant sillons nasogéniens</strong>. <strong>Photosensibilité majeure</strong></li>
                <li><strong>Lupus Subaigu</strong> : Lésions annulaires ou psoriasiformes (anti-SSA +)</li>
                <li><strong>Lupus Chronique (Discoïde)</strong> : Plaques érythémato-squameuses avec atrophie cicatricielle centrale (peut exister sans LED systémique)</li>
                <li>Ulcérations buccales/nasales <strong>indolores</strong></li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800 text-xs mb-1">C. Atteinte Articulaire (90%)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li>Arthralgies inflammatoires ou arthrites bilatérales et symétriques</li>
                <li><strong>Rhumatisme de Jaccoud</strong> : Déformations doigts (coup vent cubital, cols cygne) <strong>RÉDUCTIBLES</strong> (pas destruction osseuse = laxité ligamentaire)</li>
              </ul>
            </div>

            <div class="bg-orange-100 p-2 rounded border-2 border-orange-600">
              <p class="font-semibold text-orange-800 text-xs mb-1">D. Atteinte Rénale (Néphropathie Lupique) - CONDITIONNE PRONOSTIC VITAL</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li>Survient chez <strong>30-50%</strong> des patients</li>
                <li><strong>Signes appel</strong> : Protéinurie, hématurie microscopique, HTA, œdèmes</li>
                <li><strong>⚠️ PBR (Ponction Biopsie Rénale) IMPÉRATIVE</strong> pour classification (voir section 6)</li>
              </ul>
            </div>

            <div class="bg-green-100 p-2 rounded">
              <p class="font-semibold text-green-800 text-xs mb-1">E. Atteintes Séreuses</p>
              <p class="text-xs">Pleurésie, Péricardite (corticothérapie <strong>spectaculairement efficace</strong>)</p>
            </div>

            <div class="bg-pink-100 p-2 rounded">
              <p class="font-semibold text-pink-800 text-xs mb-1">F. Neuro-Lupus</p>
              <p class="text-xs">Convulsions, psychose (<strong>urgence</strong>), céphalées réfractaires, neuropathies périphériques</p>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">4️⃣ DIAGNOSTIC BIOLOGIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">A. Immunologie (CLÉ DE VOÛTE)</p>
              
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>AAN</strong> (Anticorps Anti-Nucléaires) : Test dépistage. <strong>Sensibilité &gt; 98%</strong>
                  <ul class="list-circle ml-4">
                    <li>⚠️ Si <strong>négatifs</strong>, diagnostic LED <strong>quasi impossible</strong> (sauf rares exceptions)</li>
                  </ul>
                </li>
                <li class="bg-yellow-50 p-1 rounded"><strong>Anti-ADN natif (dsDNA)</strong> : <strong>Très spécifiques</strong>. Taux corrélé à activité maladie (surtout rénale)</li>
                <li class="bg-pink-50 p-1 rounded"><strong>Anti-Sm</strong> : <strong>PATHOGNOMONIQUES</strong> (spécificité 99%) mais peu sensibles (20%)</li>
                <li><strong>Anti-SSA / Anti-SSB</strong> : Lupus cutané subaigu + Risque <strong>Lupus Néonatal</strong> (bloc cardiaque fœtus)</li>
                <li><strong>Anticorps Anti-Phospholipides (aPL)</strong> : Anti-cardiolipine, Anti-β2GP1, Anticoagulant circulant
                  <ul class="list-circle ml-4">
                    <li>⚠️ Recherche <strong>SYSTÉMATIQUE</strong> (risque thrombotique)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">B. Marqueurs d'Activité</p>
              <p class="text-xs"><strong>Consommation Complément</strong> : Baisse <strong>C3 et C4</strong> (signe poussée active avec formation complexes immuns)</p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ CRITÈRES CLASSIFICATION (EULAR/ACR 2019)</h4>
          <p class="text-sm italic mb-2">📊 Système à points (remplace anciens critères ARA)</p>
          
          <div class="bg-green-50 p-2 rounded border-2 border-green-500 mb-2">
            <p class="font-semibold text-green-800 text-xs mb-1">✅ Critère d'entrée OBLIGATOIRE</p>
            <p class="text-xs"><strong>AAN ≥ 1:80</strong> → Si positif, additionner les points → Score <strong>≥ 10</strong> pour classer LED</p>
          </div>

          <div class="bg-white p-2 rounded text-xs">
            <p class="font-semibold mb-1">Exemples de points forts :</p>
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Biopsie rénale classe III ou IV</strong> : 10 pts (<strong>suffit à classer</strong>)</li>
              <li><strong>Péricardite aiguë</strong> : 6 pts</li>
              <li><strong>Anti-ADN natif ou Anti-Sm</strong> : 6 pts</li>
              <li><strong>Arthrites</strong> : 6 pts</li>
              <li><strong>Rash malaire</strong> : 6 pts</li>
              <li>Alopécie non cicatricielle : 2 pts</li>
              <li>Leucopénie ou Thrombopénie : 3-4 pts</li>
            </ul>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">6️⃣ CLASSIFICATION NÉPHROPATHIE LUPIQUE (OMS/ISN-RPS)</h4>
          <p class="text-sm font-bold text-red-700 mb-2">⚠️ FONDAMENTALE pour choix thérapeutique</p>
          
          <div class="bg-white p-2 rounded text-xs">
            <table class="w-full">
              <thead class="bg-pink-100">
                <tr>
                  <th class="text-left p-1 border">Classe</th>
                  <th class="text-left p-1 border">Type</th>
                  <th class="text-left p-1 border">Attitude</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-green-50">
                  <td class="p-1 border">I</td>
                  <td class="p-1 border">Mésangiale minime</td>
                  <td class="p-1 border">Abstention</td>
                </tr>
                <tr class="border-b">
                  <td class="p-1 border">II</td>
                  <td class="p-1 border">Mésangiale proliférative</td>
                  <td class="p-1 border">Traitement si protéinurie</td>
                </tr>
                <tr class="border-b bg-orange-50">
                  <td class="p-1 border"><strong>III</strong></td>
                  <td class="p-1 border"><strong>Focale</strong></td>
                  <td class="p-1 border text-red-700"><strong>URGENCE néphro</strong></td>
                </tr>
                <tr class="border-b bg-red-50">
                  <td class="p-1 border"><strong>IV</strong></td>
                  <td class="p-1 border"><strong>Diffuse</strong> (+ sévère et fréquente)</td>
                  <td class="p-1 border text-red-700"><strong>URGENCE néphro</strong></td>
                </tr>
                <tr class="border-b bg-yellow-50">
                  <td class="p-1 border">V</td>
                  <td class="p-1 border">Extra-membraneuse</td>
                  <td class="p-1 border">Syndrome néphrotique pur</td>
                </tr>
                <tr class="border-b bg-gray-200">
                  <td class="p-1 border">VI</td>
                  <td class="p-1 border">Sclérose terminale</td>
                  <td class="p-1 border">-</td>
                </tr>
              </tbody>
            </table>
            <p class="mt-1 text-red-700 font-semibold">⚠️ Classes III et IV (prolifératives) = URGENCES → Immunosuppression lourde</p>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">7️⃣ PRISE EN CHARGE THÉRAPEUTIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">A. Traitement de Fond (POUR TOUS LES PATIENTS)</p>
              <p class="text-xs"><strong>Hydroxychloroquine (Plaquenil)</strong> : 5 mg/kg/j</p>
              <div class="bg-yellow-50 p-1 rounded mt-1">
                <p class="text-xs font-bold">🌟 <strong>"ASSURANCE-VIE du lupique"</strong></p>
                <ul class="list-disc ml-5 text-xs">
                  <li>Réduit poussées, risque thrombotique, mortalité globale</li>
                  <li>⚠️ Surveillance : Toxicité rétinienne (OCT + Champ visuel annuels)</li>
                </ul>
              </div>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-orange-700 text-xs mb-1">B. Traitement des Poussées</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Corticothérapie</strong> : Prednisone (0.5-1 mg/kg/j selon sévérité)</li>
                <li>Bolus Méthylprednisolone si atteinte viscérale grave</li>
                <li><strong>Objectif</strong> : Sevrage ou dose minimale (&lt; 5 mg/j) le + vite possible</li>
              </ul>
            </div>

            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">C. Immunosuppresseurs (Épargne Cortisonique)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Formes articulaires/cutanées réfractaires</strong> : Méthotrexate, Azathioprine, Belimumab (anti-BAFF/BLyS)</li>
                <li><strong>Néphropathie (Induction/Entretien)</strong> : <strong>Mycophénolate Mofétil</strong> (Cellcept) ou <strong>Cyclophosphamide</strong> (Endoxan) IV</li>
              </ul>
            </div>

            <div class="bg-pink-50 p-2 rounded">
              <p class="font-semibold text-pink-800 text-xs mb-1">D. Nouveautés (Biothérapies Ciblées)</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Anifrolumab</strong> : Anticorps anti-récepteur Interféron type I (efficace cutané)</li>
                <li><strong>Rituximab</strong> : Anti-CD20, sauvetage "off-label" (formes hématologiques/rénales réfractaires)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
          <h4 class="font-semibold text-indigo-800 mb-2">8️⃣ GROSSESSE ET CONTRACEPTION</h4>
          
          <div class="space-y-2">
            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">⚠️ Contraception</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Œstro-progestatifs CONTRE-INDIQUÉS</strong> si Anticorps Anti-Phospholipides (risque thrombose)</li>
                <li>✅ Privilégier : Progestatifs purs ou DIU</li>
              </ul>
            </div>

            <div class="bg-green-100 p-2 rounded">
              <p class="font-semibold text-green-800 text-xs mb-1">✅ Grossesse</p>
              <p class="text-xs mb-1"><strong>Possible</strong> si maladie inactive ("Lupus éteint") depuis <strong>6 mois</strong></p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Autorisés</strong> : Corticoïdes, Hydroxychloroquine, Azathioprine</li>
                <li><strong>⛔ INTERDITS (Tératogènes)</strong> : Méthotrexate, Mycophénolate, Cyclophosphamide</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🦋 <strong>Femme 9:1</strong>, 15-45 ans, poussées/rémissions</li>
              <li>🔬 <strong>AAN &gt; 98%</strong> sensibilité (si négatif, diagnostic quasi impossible)</li>
              <li>💎 <strong>Anti-Sm PATHOGNOMONIQUES</strong> (99% spécificité), Anti-ADN natif (activité rénale)</li>
              <li>🎭 <strong>Clinique</strong> : Érythème "Vespertilio" (respecte sillons nasogéniens), Arthrites 90%, Néphropathie 30-50%</li>
              <li>🏥 <strong>Néphropathie</strong> : PBR impérative, Classes III/IV = urgences (immunosuppression lourde)</li>
              <li>📋 <strong>Critères EULAR/ACR 2019</strong> : AAN ≥1:80 + Score ≥10</li>
              <li>💊 <strong>Hydroxychloroquine</strong> : "Assurance-vie" POUR TOUS (surveillance rétinienne)</li>
              <li>⚠️ <strong>aPL</strong> : Recherche systématique (risque thrombose, contre-indication pilule œstroprogestative)</li>
              <li>🤰 <strong>Grossesse possible</strong> si lupus éteint 6 mois (MTX/MMF/Cyclo tératogènes)</li>
            </ul>
          </div>
        </div>
      </div>`,
    children: [
        { code: "C14A", name: "LED spontanés", children: [{ code: "C14A01", name: "LED spontanés" }] },
        { code: "C14B", name: "LED induits", children: [{ code: "C14B01", name: "LED induits" }] }
    ],
  },
  {
    code: "C15",
    name: "Les insuffisances respiratoires chroniques",
    children: [
        { code: "C15A", name: "Les insuffisances respiratoires chroniques par obstruction", children: [{ code: "C15A01", name: "Bronchopneumopathie chronique obstructive (BPCO)" }, { code: "C15A02", name: "DDB (étendue)" }, { code: "C15A03", name: "Emphysème" }, { code: "C15A04", name: "Mucoviscidose" }, { code: "C15A05", name: "Asthme ancien dit \"à dyspnée continue\"" }, { code: "C15A06", name: "Autres insuffisances respiratoires chroniques par" }] },
        { code: "C15B", name: "Les insuffisances respiratoires chroniques par restriction", children: [] }
    ],
  },
  {
    code: "C16",
    name: "Poliomyélite antérieure aiguë",
    tooltip: `<div class="space-y-3">
      <h3 class="text-lg font-bold text-purple-800">🦠 POLIOMYÉLITE ANTÉRIEURE AIGUË (PAA) – FICHE SYNTHÉTIQUE</h3>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
        <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
        <p class="text-sm mb-2">Infection virale aiguë du système nerveux central, causée par le <strong>poliovirus</strong> (entérovirus, famille des Picornaviridae).</p>
        <p class="text-sm mb-2"><strong>Atteinte préférentielle</strong> : motoneurones de la corne antérieure de la moelle épinière → <strong>paralysie flasque asymétrique</strong>.</p>
        <p class="text-sm">La <strong>vaccination</strong> a largement réduit l'incidence dans le monde, mais la maladie reste endémique dans certaines régions.</p>
      </div>

      <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
        <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Pic</strong> : enfants <5 ans (anciennement avant vaccination)</li>
          <li><strong>Transmission</strong> : fécale-orale, parfois voie respiratoire</li>
          <li><strong>Incubation</strong> : 3–35 jours (habituellement 7–14 jours)</li>
          <li><strong>Formes paralysantes</strong> : <1 % des infections</li>
        </ul>
      </div>

      <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
        <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Étiologie</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Virus</strong> : Poliovirus type 1, 2 ou 3</li>
          <li><strong>Réservoir</strong> : humains uniquement</li>
          <li><strong>Virus neurotrope</strong> : se multiplie initialement dans l'intestin puis atteint le SNC par voie hématogène</li>
        </ul>
      </div>

      <div class="bg-green-50 border-l-4 border-green-500 p-3">
        <h4 class="font-semibold text-green-900 mb-2">4️⃣ Physiopathologie</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Réplication intestinale</strong> → dissémination via sang → infection cellules nerveuses</li>
          <li><strong>Atteinte préférentielle</strong> : motoneurones alpha de la corne antérieure de la moelle épinière</li>
          <li><strong>Conséquences</strong> : paralysie flasque, hypotonie, aréflexie, atrophie musculaire</li>
          <li><strong>Récupération variable</strong> : dépend du degré de destruction neuronale</li>
        </ul>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
        <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Tableau clinique</h4>
        
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold">🌡️ A. Phase prodromique (3–5 jours)</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Fièvre modérée</li>
              <li>Malaise général, anorexie, céphalées</li>
              <li>Myalgies, raideur cervicale ou lombaire</li>
              <li>Vomissements, constipation</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">⚠️ B. Phase aiguë (paralytique)</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>Paralysie flasque asymétrique</strong>, souvent proximale > distale</li>
              <li><strong>Aréflexie</strong> des muscles atteints</li>
              <li><strong>Pas de troubles sensitifs</strong></li>
              <li><strong>Muscles respiratoires</strong> : risque atteinte bulbaire ou diaphragmatique → insuffisance respiratoire</li>
              <li>Durée maximale d'aggravation : 2–3 jours, parfois jusqu'à 1 semaine</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">🔄 C. Phase de convalescence</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Régression partielle ou complète des paralysies</li>
              <li>Récupération graduelle : 6–12 mois</li>
              <li>Séquelles fréquentes : atrophie musculaire, déformations articulaires</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-red-50 border-l-4 border-red-500 p-3">
        <h4 class="font-semibold text-red-900 mb-2">6️⃣ Complications</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>⚠️ <strong>Insuffisance respiratoire aiguë</strong> (atteinte diaphragmatique ou bulbaire)</li>
          <li><strong>Déformations articulaires</strong> secondaires à l'atrophie musculaire</li>
          <li><strong>Syndrome post-polio (PPM)</strong> : survenue 10–40 ans après l'infection, faiblesse progressive</li>
        </ul>
      </div>

      <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
        <h4 class="font-semibold text-teal-900 mb-2">7️⃣ Examens complémentaires</h4>
        
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold">🔬 A. Virologie</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>Isolement du poliovirus</strong> : selles, gorge, LCR</li>
              <li>PCR et sérotype identification</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">💉 B. Biologie</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>LCR</strong> : pléiocytose modérée, protéinorachie modérée, glucose normal</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">📸 C. Imagerie</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>IRM</strong> : hyperintensités T2 dans la corne antérieure de la moelle</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">⚡ D. Électrophysiologie</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>EMG</strong> : dénervation aiguë des muscles atteints, aide au diagnostic différentiel</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
        <h4 class="font-semibold text-indigo-900 mb-2">8️⃣ Diagnostic différentiel</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Guillain-Barré</strong> (atteinte sensorielle, symétrique)</li>
          <li><strong>Myélite transverse</strong></li>
          <li><strong>Encéphalomyélite post-infectieuse</strong></li>
          <li><strong>Atteintes neuromusculaires congénitales</strong></li>
        </ul>
      </div>

      <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
        <h4 class="font-semibold text-cyan-900 mb-2">9️⃣ Traitement</h4>
        
        <div class="space-y-3 text-sm">
          <div>
            <p class="font-semibold">💊 A. Spécifique</p>
            <div class="ml-2 mt-2 space-y-2">
              <div class="bg-white p-2 rounded border border-cyan-200">
                <p class="font-semibold text-xs">⚠️ Aucun antiviral spécifique disponible</p>
              </div>
              
              <div class="bg-white p-2 rounded border border-cyan-200">
                <p class="font-semibold text-xs">💉 Prévention par vaccination :</p>
                <ul class="list-disc list-inside ml-2 text-xs">
                  <li><strong>IPV</strong> (inactivé) ou <strong>OPV</strong> (oral, vivant atténué)</li>
                  <li>Maintien de la <strong>couverture vaccinale</strong> est crucial</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <p class="font-semibold">🩹 B. Supportif</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Repos, physiothérapie précoce</li>
              <li><strong>Assistance respiratoire</strong> si paralysie diaphragmatique</li>
              <li>Traitement symptomatique : antalgiques, kinésithérapie</li>
            </ul>
          </div>

          <div>
            <p class="font-semibold">🏥 C. Rééducation</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Prévention contractures et déformations</li>
              <li>Renforcement musculaire gradué</li>
              <li>Orthèses et appareillage si nécessaire</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
        <h4 class="font-semibold text-slate-900 mb-2">🔟 Pronostic</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>Paralysie complète</strong> : récupération partielle ou complète selon gravité</li>
          <li><strong>Forme légère</strong> : régression quasi complète</li>
          <li><strong>Forme sévère</strong> (bulbaire ou respiratoire) : ⚠️ mortalité élevée sans assistance ventilatoire</li>
          <li><strong>Survie à long terme</strong> : dépend des séquelles musculaires et respiratoires</li>
        </ul>
      </div>

      <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
        <h4 class="font-semibold text-blue-900 mb-2">1️⃣1️⃣ Points clés</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>🦠 <strong>Infection virale neurotrope</strong> : atteinte motoneurones antérieurs</li>
          <li>💪 <strong>Paralysie flasque asymétrique, pas de déficit sensitif</strong></li>
          <li>🔬 <strong>Diagnostic</strong> : clinique + confirmation virologique</li>
          <li>💉 <strong>Pas de traitement antiviral spécifique</strong> : prévention = vaccination</li>
          <li>🏥 <strong>Suivi long terme</strong> : rééducation et surveillance syndrome post-polio</li>
        </ul>
      </div>

      <div class="bg-green-100 border-l-4 border-green-600 p-3">
        <h4 class="font-semibold text-green-900 mb-2">📋 Surveillance recommandée</h4>
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold">Phase aiguë :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Surveillance respiratoire étroite (capacité vitale, saturation O₂)</li>
              <li>Fonction de déglutition (atteinte bulbaire)</li>
              <li>Prévention des complications de décubitus</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">Phase de convalescence (6-12 mois) :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Évaluation régulière de la force musculaire</li>
              <li>Kinésithérapie active et passive</li>
              <li>Prévention contractures (attelles, mobilisation)</li>
              <li>Adaptation orthèses et aides techniques</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">Suivi à long terme :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>Syndrome post-polio</strong> : dépistage (faiblesse progressive, fatigue, douleurs musculaires)</li>
              <li>Évaluation orthopédique : déformations, scoliose</li>
              <li>Adaptation activités et aménagement environnement</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-yellow-100 border-l-4 border-yellow-600 p-3">
        <h4 class="font-semibold text-yellow-900 mb-2">💉 Vaccination antipoliomyélitique</h4>
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold">Deux types de vaccins :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li><strong>IPV (Inactivated Polio Vaccine)</strong> : injectable, virus inactivé, pas de risque paralysie</li>
              <li><strong>OPV (Oral Polio Vaccine)</strong> : oral, virus vivant atténué, risque très faible de paralysie vaccinale</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">Schéma vaccinal (OMS) :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Primovaccination : 3 doses (à 2, 4, 6 mois ou selon programme national)</li>
              <li>Rappels selon recommandations nationales</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">Stratégie mondiale d'éradication :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Couverture vaccinale élevée (&gt;95%)</li>
              <li>Surveillance épidémiologique active</li>
              <li>Campagnes de vaccination de masse dans zones endémiques</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-purple-100 border-l-4 border-purple-600 p-3">
        <h4 class="font-semibold text-purple-900 mb-2">🌍 Situation épidémiologique actuelle</h4>
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold">Poliovirus sauvage :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Type 2 et 3 : <strong>éradiqués</strong></li>
              <li>Type 1 : endémique dans <strong>2 pays (Afghanistan, Pakistan)</strong></li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">Poliovirus dérivé vaccinal (cVDPV) :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Rare mutation OPV → forme virulente circulante</li>
              <li>Cas sporadiques dans pays à faible couverture vaccinale</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">⚠️ Vigilance nécessaire :</p>
            <ul class="list-disc list-inside ml-2 text-xs">
              <li>Maintien couverture vaccinale élevée</li>
              <li>Surveillance des paralysies flasques aiguës (PFA)</li>
              <li>Risque réintroduction dans zones non endémiques</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
    children: [
        { code: "C16A", name: "Poliomyélite antérieure aiguë paralytique", children: [{ code: "C16A01", name: "Poliomyélite antérieure aiguë paralytique" }] },
        { code: "C16B", name: "Poliomyélite antérieure aiguë non paralytique", children: [{ code: "C16B01", name: "Poliomyélite antérieure aiguë non paralytique" }] }
    ],
  },
  {
    code: "C17",
    name: "Les maladies métaboliques",
    children: [
        { code: "C17A", name: "Diabètes", children: [{ code: "C17A01", name: "Diabète sucré type 1" }, { code: "C17A02", name: "Diabète sucré type 2 non insulino-traité" }, { code: "C17A03", name: "Diabète sucré type 2 insulino-traité" }, { code: "C17A04", name: "Diabète sucré gestationnel" }, { code: "C17A05", name: "Diabète sucré induit post médicamenteux" }] },
        { code: "C17B", name: "Dysprotéinémies", children: [{ code: "C17B01", name: "Gammapathie monoclonale" }, { code: "C17B02", name: "Autres dysprotéinémies" }] },
        { 
          code: "C17C", 
          name: "Dyslipidoses",
          children: [
            { 
              code: "C17C01", 
              name: "Maladie de Gaucher",
              tooltip: `<div class="space-y-3">
                <h3 class="text-lg font-bold text-purple-800">🧬 MALADIE DE GAUCHER (MG) – FICHE SYNTHÉTIQUE</h3>
                
                <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
                  <p class="text-sm mb-2">Maladie lysosomale rare, héréditaire <strong>autosomique récessive</strong>, due à un <strong>déficit en β-glucocérébrosidase</strong>.</p>
                  <p class="text-sm mb-2">Entraîne <strong>accumulation de glucocérébroside</strong> dans les macrophages → formation de <strong>cellules de Gaucher</strong>.</p>
                  <p class="text-sm"><strong>Conséquences</strong> : splénomégalie, hépatomégalie, cytopénies, atteinte osseuse, troubles neurologiques selon type.</p>
                </div>

                <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
                  <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Prévalence</strong> : 1/40 000–60 000 naissances</li>
                    <li><strong>Plus fréquente chez les Ashkénazes</strong> : 1/850</li>
                    <li><strong>Transmission autosomique récessive</strong></li>
                  </ul>
                </div>

                <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Physiopathologie</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Déficit de β-glucocérébrosidase lysosomiale</strong> → accumulation glucocérébroside dans macrophages</li>
                    <li><strong>Cellules de Gaucher</strong> : macrophages gonflés, cytoplasmique « crumpled tissue paper »</li>
                    <li><strong>Organes cibles</strong> : rate, foie, moelle osseuse, os, cerveau (types neuronopathiques)</li>
                  </ul>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-3">
                  <h4 class="font-semibold text-green-900 mb-2">4️⃣ Classification clinique</h4>
                  <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                    <thead>
                      <tr class="bg-gray-200">
                        <th class="border border-gray-300 p-2 text-left">Type</th>
                        <th class="border border-gray-300 p-2 text-left">Caractéristiques</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-gray-300 p-2"><strong>Type 1<br/>(non neuronopathique)</strong></td>
                        <td class="border border-gray-300 p-2">Majorité des cas, <strong>pas d'atteinte neurologique</strong>, splénomégalie, hépatomégalie, cytopénies, atteinte osseuse</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="border border-gray-300 p-2"><strong>Type 2<br/>(forme aiguë infantile)</strong></td>
                        <td class="border border-gray-300 p-2">Début avant 2 ans, <strong>atteinte neurologique sévère</strong>, mort précoce (&lt;2 ans), splénomégalie modérée</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2"><strong>Type 3<br/>(forme chronique neuronopathique)</strong></td>
                        <td class="border border-gray-300 p-2">Début enfant/ado, <strong>atteinte neurologique progressive</strong>, hépatosplénomégalie, cytopénies, troubles oculomoteurs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                  <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Signes cliniques</h4>
                  
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">🩸 A. Hématologiques</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Anémie, thrombopénie, leucopénie</li>
                        <li>Fatigue, pâleur, saignements faciles</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🫀 B. Hépato-splénomégalie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Splénomégalie volumineuse</strong> → douleurs abdominales, hypersplénisme</li>
                        <li>Hépatomégalie modérée</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🦴 C. Squelettiques</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Douleurs osseuses, <strong>crises osseuses (bone crisis)</strong></li>
                        <li>Ostéoporose, fractures, infarctus osseux, ostéonécrose</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🧠 D. Neurologiques</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Types 2 et 3</strong> : troubles du tonus, crises, mouvements anormaux, retard mental</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">➕ E. Autres</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Croissance retardée, puberté retardée</li>
                        <li>Rare : atteinte pulmonaire, cardiaque</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
                  <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
                  
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">🔬 A. Biologie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>NFS</strong> : cytopénies</li>
                        <li>Bilan hépatique : +/- perturbé</li>
                        <li><strong>Marqueurs spécifiques</strong> : chitotriosidase élevée, ferritine</li>
                        <li><strong>⭐ Enzyme lysosomale</strong> : activité β-glucocérébrosidase diminuée (diagnostic confirmatoire)</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🧬 B. Génétique</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Mutation du gène GBA</strong> sur chromosome 1q21</li>
                        <li>Séquençage ou panels mutationnels pour confirmation</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">📸 C. Imagerie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Échographie / scanner</strong> : hépatosplénomégalie</li>
                        <li><strong>IRM osseuse</strong> : atteinte médullaire, infarctus, ostéonécrose</li>
                        <li><strong>Radiographies</strong> : ostéopénie, déformations osseuses, crises osseuses</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🔬 D. Biopsie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Rarement nécessaire : macrophages chargés de lipides (« cellules de Gaucher »)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
                  <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Cliniquement suspecte</strong> devant splénomégalie + cytopénies + douleurs osseuses</li>
                    <li><strong>Confirmation</strong> : activité enzymatique réduite β-glucocérébrosidase ± mutation GBA</li>
                  </ul>
                </div>

                <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
                  <h4 class="font-semibold text-cyan-900 mb-2">8️⃣ Traitement</h4>
                  
                  <div class="space-y-3 text-sm">
                    <div>
                      <p class="font-semibold">💉 A. Traitement spécifique</p>
                      
                      <div class="ml-2 mt-2 space-y-2">
                        <div class="bg-white p-2 rounded border border-cyan-200">
                          <p class="font-semibold text-xs">⭐ Enzyme Replacement Therapy (ERT)</p>
                          <ul class="list-disc list-inside ml-2 text-xs">
                            <li>Imiglucerase, velaglucerase, taliglucerase</li>
                            <li>Réduit splénomégalie, cytopénies, douleurs osseuses</li>
                          </ul>
                        </div>
                        
                        <div class="bg-white p-2 rounded border border-cyan-200">
                          <p class="font-semibold text-xs">💊 Substrate Reduction Therapy (SRT)</p>
                          <ul class="list-disc list-inside ml-2 text-xs">
                            <li>Miglustat, eliglustat</li>
                            <li>Pour patients intolérants à ERT ou formes légères</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p class="font-semibold">🩹 B. Traitement symptomatique</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Transfusions pour cytopénies sévères</li>
                        <li>Analgésiques pour douleurs osseuses</li>
                        <li>Chirurgie orthopédique si ostéonécrose / fractures</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">📊 C. Suivi</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Clinique</strong> : taille rate/foie, douleurs osseuses</li>
                        <li><strong>Biologique</strong> : NFS, marqueurs enzymatiques</li>
                        <li><strong>Imagerie</strong> : IRM osseuse périodique</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-red-50 border-l-4 border-red-500 p-3">
                  <h4 class="font-semibold text-red-900 mb-2">9️⃣ Complications</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>⚠️ <strong>Splénomégalie massive</strong> → hypersplénisme</li>
                    <li><strong>Ostéonécrose, fractures, arthropathies</strong></li>
                    <li><strong>Atteinte neurologique</strong> (types 2 et 3)</li>
                    <li>⚠️ <strong>Risque accru de maladies malignes hématologiques</strong> (myélome, lymphome)</li>
                  </ul>
                </div>

                <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
                  <h4 class="font-semibold text-slate-900 mb-2">🔟 Pronostic</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Type 1</strong> : ✅ Bonne avec ERT, qualité de vie améliorée</li>
                    <li><strong>Type 2</strong> : ⚠️ Très sévère, mortalité précoce</li>
                    <li><strong>Type 3</strong> : Évolution chronique, atteinte neurologique progressive</li>
                  </ul>
                </div>

                <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
                  <h4 class="font-semibold text-blue-900 mb-2">1️⃣1️⃣ Points clés</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>🧬 <strong>Maladie lysosomale rare</strong>, autosomique récessive, déficit β-glucocérébrosidase</li>
                    <li>📋 <strong>Type 1</strong> = non neuronopathique, <strong>Type 2/3</strong> = neuronopathique</li>
                    <li>🚨 <strong>Splénomégalie + cytopénies + atteinte osseuse</strong> = alerte clinique</li>
                    <li>✅ <strong>Confirmation</strong> : activité enzymatique + mutation GBA</li>
                    <li>💉 <strong>ERT = traitement de référence</strong>, SRT alternative orale</li>
                    <li>🤝 <strong>Suivi multidisciplinaire</strong> : hématologie, orthopédie, neurologie</li>
                  </ul>
                </div>

                <div class="bg-green-100 border-l-4 border-green-600 p-3">
                  <h4 class="font-semibold text-green-900 mb-2">📋 Surveillance recommandée</h4>
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">Suivi clinique (tous les 6-12 mois) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Examen physique : taille rate/foie (palpation, échographie)</li>
                        <li>Évaluation douleurs osseuses</li>
                        <li>Croissance et développement (enfants)</li>
                        <li>Examen neurologique (types 2/3)</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Biologie (tous les 6-12 mois) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>NFS complète (hémoglobine, plaquettes, leucocytes)</li>
                        <li>Marqueurs : chitotriosidase, ferritine</li>
                        <li>Bilan hépatique</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Imagerie :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>IRM osseuse : tous les 1-2 ans (atteinte médullaire, ostéonécrose)</li>
                        <li>Densitométrie osseuse (DEXA) : annuelle si risque ostéoporose</li>
                        <li>Échographie abdominale : surveillance splénomégalie</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Dépistage complications :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Dépistage maladies malignes hématologiques (électrophorèse protéines)</li>
                        <li>Évaluation pulmonaire si symptômes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-100 border-l-4 border-yellow-600 p-3">
                  <h4 class="font-semibold text-yellow-900 mb-2">🎯 Critères d'initiation ERT</h4>
                  <p class="text-sm mb-2"><strong>Indications pour débuter le traitement :</strong></p>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>Splénomégalie symptomatique ou massive (&gt;10× normale)</li>
                    <li>Thrombopénie &lt;60 000/μL</li>
                    <li>Anémie significative (Hb &lt;11 g/dL)</li>
                    <li>Atteinte osseuse symptomatique (douleurs, crises osseuses, ostéonécrose)</li>
                    <li>Retard de croissance chez l'enfant</li>
                    <li>Détérioration qualité de vie</li>
                  </ul>
                </div>
              </div>`
            }, 
            { 
              code: "C17C02", 
              name: "Maladie de Niemann Pick",
              tooltip: `<div class="space-y-3">
                <h3 class="text-lg font-bold text-purple-800">🧬 MALADIE DE NIEMANN-PICK (NP) – FICHE SYNTHÉTIQUE</h3>
                
                <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h4 class="font-semibold text-blue-900 mb-2">1️⃣ Définition</h4>
                  <p class="text-sm mb-2">Maladie lysosomale rare, héréditaire <strong>autosomique récessive</strong>, caractérisée par un <strong>déficit en sphingomyélinase acide</strong> (types A et B) ou par des <strong>anomalies de transport lipidique</strong> (type C).</p>
                  <p class="text-sm">Entraîne <strong>accumulation de sphingomyéline</strong> et autres lipides dans les macrophages → infiltration viscérale et neurologique.</p>
                </div>

                <div class="bg-purple-50 border-l-4 border-purple-500 p-3">
                  <h4 class="font-semibold text-purple-900 mb-2">2️⃣ Épidémiologie</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Prévalence</strong> : 1/150 000–1/250 000 naissances</li>
                    <li><strong>Plus fréquente dans certaines populations</strong> : Ashkénazes (type A)</li>
                    <li><strong>Transmission autosomique récessive</strong></li>
                  </ul>
                </div>

                <div class="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 class="font-semibold text-orange-900 mb-2">3️⃣ Physiopathologie</h4>
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">🔬 Type A/B :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Déficit en sphingomyélinase acide</strong> → accumulation sphingomyéline dans macrophages</li>
                        <li>Formation de <strong>cellules de Niemann-Pick</strong> (cellules spumeuses)</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">🔬 Type C :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Défaut du transport intracellulaire</strong> du cholestérol et lipides</li>
                        <li>Accumulation dans lysosomes</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">🎯 Organes cibles :</p>
                      <p class="text-xs ml-2">Foie, rate, moelle osseuse, cerveau, poumons</p>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 border-l-4 border-green-500 p-3">
                  <h4 class="font-semibold text-green-900 mb-2">4️⃣ Classification clinique</h4>
                  <table class="w-full text-sm border-collapse border border-gray-300 mt-2">
                    <thead>
                      <tr class="bg-gray-200">
                        <th class="border border-gray-300 p-2 text-left">Type</th>
                        <th class="border border-gray-300 p-2 text-left">Caractéristiques</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-gray-300 p-2"><strong>Type A<br/>(forme aiguë infantile neuronopathique)</strong></td>
                        <td class="border border-gray-300 p-2">Début <strong>&lt;6 mois</strong>, hépatosplénomégalie massive, retard moteur, troubles neurologiques sévères, <strong>mort précoce &lt;3 ans</strong></td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="border border-gray-300 p-2"><strong>Type B<br/>(forme chronique non neuronopathique)</strong></td>
                        <td class="border border-gray-300 p-2">Début enfance/ado, hépatosplénomégalie, cytopénies, troubles pulmonaires, <strong>survie longue</strong>, peu ou pas d'atteinte neurologique</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2"><strong>Type C</strong></td>
                        <td class="border border-gray-300 p-2">Début variable (enfance à adulte), <strong>atteinte neurologique progressive</strong> : ataxie, dystonie, dysarthrie, cataplexie, troubles oculaires (vertical gaze palsy), hépatosplénomégalie modérée</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                  <h4 class="font-semibold text-yellow-900 mb-2">5️⃣ Signes cliniques</h4>
                  
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">🫀 A. Viscéraux</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Splénomégalie + hépatomégalie</strong></li>
                        <li>Cytopénies : anémie, thrombopénie, leucopénie</li>
                        <li>Retard de croissance</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🧠 B. Neurologiques</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Type A</strong> : retard moteur sévère, hypotonie, convulsions</li>
                        <li><strong>Type C</strong> : ataxie, dystonie, troubles du mouvement, dysarthrie, cataplexie, dégénérescence cognitive</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🫁 C. Pulmonaires</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Type B</strong> : atteinte pulmonaire (pneumopathie interstitielle, insuffisance respiratoire)</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">👁️ D. Oculaires</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Type C</strong> : atteinte du mouvement vertical des yeux (<strong>vertical gaze palsy</strong> - signe pathognomonique)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-teal-50 border-l-4 border-teal-500 p-3">
                  <h4 class="font-semibold text-teal-900 mb-2">6️⃣ Examens complémentaires</h4>
                  
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">🔬 A. Biologie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Cytopénies : anémie, thrombopénie</li>
                        <li>Bilan hépatique : anomalies modérées</li>
                        <li><strong>⭐ Enzyme</strong> : sphingomyélinase acide (types A/B) ↓</li>
                        <li><strong>Tests moléculaires</strong> : mutations SMPD1 (A/B), NPC1/NPC2 (type C)</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">📸 B. Imagerie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Échographie abdominale</strong> : hépatosplénomégalie</li>
                        <li><strong>IRM cérébrale</strong> : atrophie cérébelleuse, anomalies des noyaux gris (type C)</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🔬 C. Biopsie</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li><strong>Moelle osseuse</strong> : cellules spumeuses (macrophages bourrés de lipides)</li>
                        <li><strong>Foie</strong> : infiltration hépatique par cellules de Niemann-Pick</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3">
                  <h4 class="font-semibold text-indigo-900 mb-2">7️⃣ Diagnostic</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Type A/B</strong> : suspicion clinique (hépatosplénomégalie + cytopénies) + <strong>activité enzymatique ↓</strong> + mutation SMPD1</li>
                    <li><strong>Type C</strong> : suspicion neurologique + tests fonctionnels du transport lipidique + mutation NPC1/NPC2</li>
                  </ul>
                </div>

                <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3">
                  <h4 class="font-semibold text-cyan-900 mb-2">8️⃣ Traitement</h4>
                  
                  <div class="space-y-3 text-sm">
                    <div>
                      <p class="font-semibold">💉 A. Traitement spécifique</p>
                      
                      <div class="ml-2 mt-2 space-y-2">
                        <div class="bg-white p-2 rounded border border-cyan-200">
                          <p class="font-semibold text-xs">🔬 Type B :</p>
                          <ul class="list-disc list-inside ml-2 text-xs">
                            <li>Enzyme replacement therapy <strong>en développement</strong></li>
                          </ul>
                        </div>
                        
                        <div class="bg-white p-2 rounded border border-cyan-200">
                          <p class="font-semibold text-xs">💊 Type C :</p>
                          <ul class="list-disc list-inside ml-2 text-xs">
                            <li><strong>Miglustat</strong> (inhibiteur de synthèse glycolipides)</li>
                            <li>→ Ralentit progression neurologique</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p class="font-semibold">🩹 B. Traitement symptomatique</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Transfusions pour cytopénies sévères</li>
                        <li>Kinésithérapie et rééducation neurologique</li>
                        <li>Traitement complications pulmonaires ou hépatiques</li>
                      </ul>
                    </div>

                    <div>
                      <p class="font-semibold">🤝 C. Support</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Suivi multidisciplinaire : hématologie, neurologie, pneumologie, génétique</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-red-50 border-l-4 border-red-500 p-3">
                  <h4 class="font-semibold text-red-900 mb-2">9️⃣ Complications</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>⚠️ <strong>Déficit neurologique progressif</strong> (type A/C)</li>
                    <li><strong>Insuffisance respiratoire</strong> (type B)</li>
                    <li><strong>Cytopénies sévères</strong> → risque hémorragique et infectieux</li>
                    <li><strong>Hépatopathie chronique / fibrose</strong></li>
                  </ul>
                </div>

                <div class="bg-slate-50 border-l-4 border-slate-500 p-3">
                  <h4 class="font-semibold text-slate-900 mb-2">🔟 Pronostic</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Type A</strong> : ⚠️ Très sévère, mortalité <strong>&lt;3 ans</strong></li>
                    <li><strong>Type B</strong> : ✅ Survie normale ou prolongée, complications viscérales possibles</li>
                    <li><strong>Type C</strong> : Évolution neurologique progressive → dépend du moment du diagnostic et du traitement (miglustat)</li>
                  </ul>
                </div>

                <div class="bg-blue-100 border-l-4 border-blue-600 p-3">
                  <h4 class="font-semibold text-blue-900 mb-2">1️⃣1️⃣ Points clés</h4>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>🧬 <strong>Maladie lysosomale rare</strong>, autosomique récessive, déficit sphingomyélinase (A/B) ou transport lipidique (C)</li>
                    <li>📋 <strong>Type A</strong> = infantile sévère, <strong>Type B</strong> = chronique viscéral, <strong>Type C</strong> = neurologique progressive</li>
                    <li>🚨 <strong>Signes clés</strong> : hépatosplénomégalie, cytopénies, atteinte neurologique selon type</li>
                    <li>👁️ <strong>Type C : vertical gaze palsy</strong> = signe pathognomonique</li>
                    <li>✅ <strong>Confirmation</strong> : activité enzymatique + mutation génétique</li>
                    <li>💊 <strong>Traitement</strong> : essentiellement symptomatique, avec ERT ou <strong>miglustat</strong> selon type</li>
                  </ul>
                </div>

                <div class="bg-green-100 border-l-4 border-green-600 p-3">
                  <h4 class="font-semibold text-green-900 mb-2">📋 Surveillance recommandée</h4>
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">Suivi clinique (tous les 3-6 mois) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Examen physique : taille rate/foie</li>
                        <li>Évaluation neurologique (ataxie, troubles oculomoteurs, cognition)</li>
                        <li>Fonction pulmonaire (Type B)</li>
                        <li>Croissance et développement (enfants)</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Biologie (tous les 3-6 mois) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>NFS complète (cytopénies)</li>
                        <li>Bilan hépatique</li>
                        <li>Marqueurs selon type</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Imagerie :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>IRM cérébrale : annuelle (Type C) - atrophie cérébelleuse</li>
                        <li>Scanner thoracique : selon besoin (Type B) - atteinte pulmonaire</li>
                        <li>Échographie abdominale : surveillance organomégalie</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Évaluations spécialisées :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Neuropsychologie : évaluation cognitive (Type C)</li>
                        <li>Orthophonie : troubles déglutition/dysarthrie</li>
                        <li>EFR : fonction pulmonaire (Type B)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-100 border-l-4 border-yellow-600 p-3">
                  <h4 class="font-semibold text-yellow-900 mb-2">⚠️ Diagnostic différentiel</h4>
                  <div class="space-y-2 text-sm">
                    <div>
                      <p class="font-semibold">Hépatosplénomégalie + cytopénies :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Maladie de Gaucher</li>
                        <li>Leucémies, lymphomes</li>
                        <li>Maladies de surcharge (glycogénoses)</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-semibold">Ataxie progressive (Type C) :</p>
                      <ul class="list-disc list-inside ml-2 text-xs">
                        <li>Ataxie de Friedreich</li>
                        <li>Ataxies cérébelleuses héréditaires</li>
                        <li>Leucodystrophies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>`
            }, 
            { code: "C17C03", name: "Autres Dyslipidoses" }
          ] 
        }
    ],
  },
  {
    code: "C18",
    name: "Les cardiopathies congénitales",
    tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-blue-700">❤️ CARDIOPATHIES CONGÉNITALES</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ GÉNÉRALITÉS ET ÉPIDÉMIOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📊 Prévalence</p>
              <p class="text-xs"><strong>8-10 pour 1000 naissances vivantes</strong> (~1%)</p>
            </div>
            
            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-800 text-xs mb-1">🧬 Étiologie</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Multifactorielle (90%)</strong> : Interaction gènes/environnement</li>
                <li><strong>Chromosomique</strong> :
                  <ul class="list-circle ml-4">
                    <li>Trisomie 21 → Canal atrio-ventriculaire</li>
                    <li>Turner → Coarctation</li>
                    <li>DiGeorge → Tronc artériel/Fallot</li>
                  </ul>
                </li>
                <li><strong>Toxiques/Maternels</strong> : Rubéole, Alcool (SAF), Lithium, Diabète maternel</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ CLASSIFICATION PHYSIOPATHOLOGIQUE</h4>
          <p class="text-sm italic mb-2">⚡ 2 grands groupes selon présence/absence de cyanose</p>
          
          <div class="space-y-2">
            <div class="bg-pink-100 p-2 rounded border-2 border-pink-500">
              <p class="font-semibold text-pink-800 text-xs mb-1">A. CARDIOPATHIES ACYANOGÈNES (Sang rose)</p>
              <p class="text-xs italic mb-2">Pas de mélange sang désaturé vers circulation systémique</p>
              
              <div class="space-y-1">
                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-blue-700 text-xs">1. Shunts Gauche-Droite (Hyperdébit pulmonaire)</p>
                  <p class="text-xs mb-1">Sang oxygéné repasse vers cœur droit/poumons</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>CIV</strong> (Communication Inter-Ventriculaire) : <strong>La + fréquente</strong></li>
                    <li><strong>CIA</strong> (Communication Inter-Auriculaire)</li>
                    <li><strong>PCA</strong> (Persistance Canal Artériel)</li>
                    <li><strong>CAV</strong> (Canal Atrio-Ventriculaire)</li>
                  </ul>
                  <p class="text-xs mt-1 text-red-700"><strong>⚠️ Risque évolutif</strong> : IC, HTAP, syndrome d'Eisenmenger (inversion shunt → devient cyanogène)</p>
                </div>

                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-orange-700 text-xs">2. Obstacles (Sténoses)</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>Coarctation de l'Aorte</strong> : Rétrécissement isthme aortique</li>
                    <li><strong>Sténose Valvulaire</strong> : Aortique ou Pulmonaire</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">B. CARDIOPATHIES CYANOGÈNES (Sang bleu)</p>
              <p class="text-xs italic mb-2">Shunt Droite-Gauche (sang désaturé part dans l'aorte) ou mélange complet</p>
              
              <div class="space-y-1">
                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-teal-700 text-xs">1. Débit pulmonaire DIMINUÉ (Poumon clair)</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>Tétralogie de Fallot</strong> : <strong>+ fréquente des cyanogènes après 1 an</strong></li>
                    <li><strong>Atrésie Pulmonaire</strong></li>
                  </ul>
                </div>

                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-indigo-700 text-xs">2. Débit pulmonaire AUGMENTÉ (Poumon chargé)</p>
                  <ul class="list-disc ml-5 text-xs">
                    <li><strong>TGV</strong> (Transposition Gros Vaisseaux) : <strong>URGENCE néonatale absolue</strong></li>
                    <li><strong>Tronc Artériel Commun</strong></li>
                    <li><strong>RVPAT</strong> (Retour Veineux Pulmonaire Anormal Total)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ PATHOLOGIES CLÉS : Points de Repère</h4>
          
          <div class="bg-white p-2 rounded text-xs">
            <table class="w-full">
              <thead class="bg-yellow-100">
                <tr>
                  <th class="text-left p-1 border">Pathologie</th>
                  <th class="text-left p-1 border">Clinique "Typique"</th>
                  <th class="text-left p-1 border">Auscultation</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-1 border"><strong>CIV</strong></td>
                  <td class="p-1 border">Asymptomatique si petite. IC (tétées difficiles, sueurs) si large</td>
                  <td class="p-1 border">Souffle holosystolique intense "en rayon de roue" (bord sternal gauche)</td>
                </tr>
                <tr class="border-b bg-blue-50">
                  <td class="p-1 border"><strong>CIA</strong></td>
                  <td class="p-1 border">Asymptomatique enfance. Découverte fortuite ou âge adulte</td>
                  <td class="p-1 border"><strong>Dédoublement fixe du B2</strong>. Souffle éjectionnel pulmonaire (hyperdébit, pas par trou)</td>
                </tr>
                <tr class="border-b bg-green-50">
                  <td class="p-1 border"><strong>PCA</strong></td>
                  <td class="p-1 border">Prématuré. <strong>Pouls bondissants</strong></td>
                  <td class="p-1 border">Souffle <strong>continu</strong> (systolo-diastolique) sous-claviculaire gauche ("tunnelier")</td>
                </tr>
                <tr class="border-b bg-orange-50">
                  <td class="p-1 border"><strong>Coarctation</strong></td>
                  <td class="p-1 border"><strong>HTA membres supérieurs</strong>, pouls fémoraux abolis/faibles</td>
                  <td class="p-1 border">Souffle systolique <strong>dans le dos</strong> (interscapulaire)</td>
                </tr>
                <tr class="border-b bg-purple-50">
                  <td class="p-1 border"><strong>Tétralogie Fallot</strong></td>
                  <td class="p-1 border">Cyanose progressive. Crises anoxiques (effort/pleurs). <strong>"Squatting"</strong> (accroupissement soulagement)</td>
                  <td class="p-1 border">Souffle systolique éjectionnel (sténose pulmonaire)</td>
                </tr>
                <tr class="border-b bg-red-50">
                  <td class="p-1 border"><strong>TGV</strong></td>
                  <td class="p-1 border"><strong>Cyanose isolée réfractaire O₂</strong> dès naissance (gros bébé "rose qui bleuit")</td>
                  <td class="p-1 border">Pas de souffle caractéristique. <strong>B2 unique et claqué</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">4️⃣ DIAGNOSTIC</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 text-xs mb-1">A. Circonstances de Découverte</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Anténatal</strong> : Échographie fœtale (formes sévères)</li>
                <li><strong>Néonatal</strong> : Cyanose, détresse respiratoire, abolition pouls fémoraux, souffle</li>
                <li><strong>Nourrisson</strong> : Retard croissance (cassure pondérale), infections respiratoires répétition, dyspnée aux tétées</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">B. Examens Complémentaires</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Radiographie Thoracique</strong> :
                  <ul class="list-circle ml-4">
                    <li>Taille cœur (Index Cardio-Thoracique)</li>
                    <li>Vascularisation pulmonaire (Hypervascularisation = Shunt G-D / Hypovascularisation = Obstacle pulmonaire)</li>
                    <li>Forme cœur (ex: "Cœur en sabot" dans Fallot)</li>
                  </ul>
                </li>
                <li><strong>ECG</strong> : Axe du cœur, hypertrophies ventriculaires (HVD/HVG)</li>
                <li class="bg-green-50 p-1 rounded"><strong>Échocardiographie Doppler</strong> : <strong>EXAMEN CLÉ</strong>. Confirme anatomie + quantifie shunts/gradients</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">5️⃣ PRINCIPES DE PRISE EN CHARGE</h4>
          
          <div class="space-y-2">
            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-blue-700 text-xs mb-1">A. Médicale</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Insuffisance Cardiaque</strong> : Diurétiques (Furosémide), IEC (Captopril)</li>
                <li><strong>Fermeture Canal Artériel</strong> (Prématuré) : Ibuprofène ou Indométacine</li>
                <li class="bg-yellow-50 p-1 rounded"><strong>Maintien Canal Artériel</strong> (Formes ducto-dépendantes) :
                  <ul class="list-circle ml-4">
                    <li><strong>VITAL</strong> dans certaines pathologies (TGV, Coarctation sévère, Atrésie pulmonaire)</li>
                    <li>Assure mélange ou débit systémique en attendant chirurgie</li>
                    <li><strong>Traitement</strong> : <strong>Prostaglandines (PGE1)</strong> en perfusion continue</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">B. Interventionnelle (Cathétérisme)</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Dilatation</strong> : Valvuloplastie (sténose pulmonaire/aortique), angioplastie (re-coarctation)</li>
                <li><strong>Atrioseptostomie (Rashkind)</strong> : Geste sauvetage TGV (créer CIA pour mélanger sang)</li>
                <li><strong>Fermeture</strong> : Prothèses (Amplatzer) pour CIA ou PCA</li>
              </ul>
            </div>

            <div class="bg-orange-50 p-2 rounded">
              <p class="font-semibold text-orange-700 text-xs mb-1">C. Chirurgicale</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Palliative</strong> : Anastomose de Blalock-Taussig (dérivation sang vers poumons, Fallot sévère)</li>
                <li><strong>Curative</strong> : Fermeture communication (patch), "Switch" artériel (TGV), réparation valvulaire</li>
              </ul>
            </div>

            <div class="bg-red-50 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">D. Prophylaxie Endocardite d'Osler</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>INDISPENSABLE</strong> pour toutes cardiopathies congénitales (surtout cyanogènes ou avec matériel prothétique)</li>
                <li>Hygiène bucco-dentaire <strong>stricte</strong></li>
                <li>Antibioprophylaxie pour gestes à risque</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
          <h4 class="font-semibold text-indigo-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>📊 <strong>1% naissances</strong> (8-10/1000), 90% multifactoriel</li>
              <li>🎨 <strong>2 groupes</strong> : Acyanogènes (sang rose) vs Cyanogènes (sang bleu)</li>
              <li>💗 <strong>CIV = la + fréquente</strong> (acyanogène)</li>
              <li>💙 <strong>Tétralogie Fallot = + fréquente cyanogène</strong> (après 1 an)</li>
              <li>🚨 <strong>TGV = URGENCE néonatale absolue</strong></li>
              <li>🎵 <strong>Signes clés</strong> : CIA (dédoublement fixe B2), PCA (souffle continu), Coarctation (HTA MS + pouls fémoraux abolis)</li>
              <li>⚠️ <strong>Shunt G-D</strong> : Risque Eisenmenger (inversion shunt → cyanose)</li>
              <li>🔬 <strong>Échocardiographie Doppler = EXAMEN CLÉ</strong></li>
              <li>💊 <strong>PGE1</strong> : Maintien canal artériel (formes ducto-dépendantes)</li>
              <li>🦠 <strong>Prophylaxie endocardite d'Osler INDISPENSABLE</strong></li>
            </ul>
          </div>
        </div>
      </div>`,
    children: [
        { code: "C18A", name: "Cardiopathies congénitales non cyanogènes (CCNC)", children: [{ code: "C18A01", name: "Communication interventriculaire (CIV)" }, { code: "C18A02", name: "Communication interauriculaire (CIA)" }, { code: "C18A03", name: "Persistance du canal artériel" }, { code: "C18A04", name: "Canal atrio-ventriculaire Complet (CAV Complet)" }, { code: "C18A05", name: "Rétrécissement aortique (RAO)" }, { code: "C18A06", name: "Coarctation de l'aorte" }, { code: "C18A07", name: "Anomalies des arcs Aortiques" }, { code: "C18A08", name: "Rétrécissement mitral Congénital (RM)" }, { code: "C18A09", name: "Coeur triatrial" }, { code: "C18A10", name: "Canal Atrio-ventriculaire Partiel (CAV Partiel)" }, { code: "C18A11", name: "Autres cardiopathies congénitales non cyanogènes" }] },
        { code: "C18B", name: "Cardiopathies congénitales cyanogènes (CCC)", children: [{ code: "C18B01", name: "Sténose pulmonaire (AP)" }, { code: "C18B02", name: "Tétralogie de Fallot (T4F)" }, { code: "C18B03", name: "Trilogie de Fallot (T3F)" }, { code: "C18B04", name: "Atrésie de la tricuspide" }, { code: "C18B05", name: "Transposition des gros vaisseaux (TGV)" }, { code: "C18B06", name: "Ventricule droit à double issue (VDDI)" }, { code: "C18B07", name: "Retour veineux pulmonaire anormal (RVPA)" }, { code: "C18B08", name: "Ventricule unique" }, { code: "C18B09", name: "Autres cardiopathies congénitales cyanogènes" }] }
    ],
  },
  {
    code: "C19",
    name: "Les affections endocriniennes...",
    children: [
        { 
          code: "C19A", 
          name: "Syndrome de Cushing",
          tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-orange-700">🔴 SYNDROME DE CUSHING</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET PHYSIOPATHOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Définition</p>
              <p class="text-xs">Ensemble manifestations cliniques/biologiques induites par <strong>exposition chronique à un excès de glucocorticoïdes (cortisol)</strong></p>
            </div>
            
            <div class="bg-purple-50 p-2 rounded">
              <p class="font-semibold text-purple-800 text-xs mb-1">🔬 Mécanisme</p>
              <p class="text-xs mb-1">Cortisol = hormone <strong>catabolisante</strong>. Excès entraîne :</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Fonte protéique (peau, muscles, os)</li>
                <li>Redistribution des graisses</li>
                <li>Rétention hydro-sodée</li>
              </ul>
            </div>
            
            <div class="bg-red-100 p-2 rounded border border-red-400">
              <p class="font-semibold text-red-800 text-xs">⚠️ Cause la + fréquente : <strong>IATROGÈNE</strong> (prise prolongée corticoïdes exogènes)</p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">2️⃣ PRÉSENTATION CLINIQUE ("Phénotype Cushingoïde")</h4>
          <p class="text-sm italic mb-2">👁️ Diagnostic souvent suspecté sur l'<strong>INSPECTION</strong> ("Spot diagnosis")</p>
          
          <div class="space-y-2">
            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">A. Signes Morphologiques (SPÉCIFIQUES)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Obésité facio-tronculaire</strong> : Prise poids paradoxale (visage + tronc) avec <strong>membres fins</strong></li>
                <li><strong>Faciès lunaire</strong> : Visage rond, rouge (érythrosique), bouffi</li>
                <li><strong>Bosse de bison</strong> (Buffalo hump) : Amas graisseux nuque</li>
                <li>Comblement creux sus-claviculaires</li>
              </ul>
            </div>

            <div class="bg-purple-100 p-2 rounded border-2 border-purple-500">
              <p class="font-semibold text-purple-800 text-xs mb-1">B. Signes Cutanés (HAUTE VALEUR DIAGNOSTIQUE)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li class="bg-pink-50 p-1 rounded"><strong>Vergetures POURPRES</strong> : <strong>Larges (&gt;1cm), verticales, rouge-violacé</strong> (abdomen, cuisses, seins)
                  <ul class="list-circle ml-4">
                    <li>🌟 <strong>Signe le + DISCRIMINANT</strong></li>
                  </ul>
                </li>
                <li><strong>Fragilité cutanée</strong> : Peau fine ("papier à cigarette"), ecchymoses au moindre choc (signe tablier)</li>
                <li><strong>Hirsutisme et acné</strong> (excès androgènes associé)</li>
              </ul>
            </div>

            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 text-xs mb-1">C. Signes Musculo-Squelettiques (Catabolisme)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Amyotrophie proximale</strong> : Fonte quadriceps (<strong>"Signe du tabouret"</strong> : difficulté se lever sans les mains)</li>
                <li><strong>Ostéoporose</strong> : Fractures pathologiques, tassements vertébraux</li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800 text-xs mb-1">D. Complications Métaboliques et Vasculaires</p>
              <ul class="list-disc ml-5 text-xs">
                <li>Diabète secondaire (Insulino-résistance)</li>
                <li>HTA</li>
                <li>Troubles cycle menstruel (aménorrhée), baisse libido</li>
                <li>Troubles psychiatriques (irritabilité, dépression, insomnie)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">3️⃣ DÉMARCHE DIAGNOSTIQUE</h4>
          <p class="text-sm font-bold text-purple-700 mb-2">⚡ 2 ÉTAPES STRICTES : 1. Confirmer hypercortisolisme, 2. Trouver cause</p>
          
          <div class="space-y-2">
            <div class="bg-green-100 p-2 rounded border-2 border-green-500">
              <p class="font-semibold text-green-800 text-xs mb-1">ÉTAPE 1 : Affirmation Hypercortisolisme (Dépistage)</p>
              <p class="text-xs italic mb-1">⚠️ <strong>≥ 2 tests positifs</strong> parmi :</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Cortisol Libre Urinaire (CLU) 24h</strong> : Augmenté</li>
                <li><strong>Test de freinage minute (Nugent)</strong> :
                  <ul class="list-circle ml-4">
                    <li>1mg Dexaméthasone à minuit</li>
                    <li>Cortisol plasmatique 8h <strong>&gt; 50 nmol/L</strong> (absence freinage)</li>
                  </ul>
                </li>
                <li><strong>Cortisol salivaire nocturne</strong> : Augmenté (perte rythme nycthéméral)</li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">ÉTAPE 2 : Diagnostic Étiologique (Mesure ACTH)</p>
              <p class="text-xs">Une fois Cushing confirmé → <strong>Dosage ACTH plasmatique</strong> pour orienter l'enquête</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">4️⃣ CLASSIFICATION ÉTIOLOGIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-orange-100 p-2 rounded border-2 border-orange-500">
              <p class="font-semibold text-orange-800 text-xs mb-1">A. Cushing ACTH-DÉPENDANT (ACTH élevée/normale inadaptée)</p>
              <p class="text-xs italic mb-1">Hypophyse ou tumeur stimule les surrénales</p>
              
              <div class="space-y-1 text-xs">
                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-red-700"><strong>Maladie de Cushing (70%)</strong></p>
                  <ul class="list-disc ml-5">
                    <li><strong>Micro-adénome hypophysaire corticotrope</strong></li>
                    <li>Touche surtout <strong>femme jeune</strong></li>
                    <li>Répond au test freinage fort + stimulation CRH</li>
                  </ul>
                </div>

                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-pink-700">Sécrétion Ectopique d'ACTH (Paranéoplasique)</p>
                  <ul class="list-disc ml-5">
                    <li>Tumeur neuro-endocrine (Poumon petites cellules, carcinoïde bronchique)</li>
                    <li>Cushing souvent <strong>brutal, intense</strong></li>
                    <li><strong>Mélanodermie</strong> (peau bronzée) + <strong>Hypokaliémie sévère</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">B. Cushing ACTH-INDÉPENDANT (ACTH effondrée/freinée)</p>
              <p class="text-xs italic mb-1">Surrénale sécrète seule, hypophyse au repos (Feedback négatif)</p>
              
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Adénome surrénalien</strong> : Tumeur bénigne unilatérale</li>
                <li><strong>Corticosurrénalome</strong> : Cancer surrénale (mauvais pronostic, virilisation marquée)</li>
                <li><strong>Hyperplasie macronodulaire bilatérale</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 mb-2">5️⃣ EXAMENS DE LOCALISATION</h4>
          
          <div class="bg-white p-2 rounded text-xs">
            <ul class="list-disc ml-5 space-y-1">
              <li><strong>Si ACTH Basse</strong> : <strong>Scanner (TDM) surrénales</strong></li>
              <li><strong>Si ACTH Haute</strong> :
                <ul class="list-circle ml-4">
                  <li><strong>IRM Hypophysaire</strong> (recherche adénome)</li>
                  <li>Si IRM normale : <strong>Cathétérisme sinus pétreux inférieurs</strong> (Gold Standard différencier hypophysaire vs ectopique)</li>
                  <li><strong>Scanner TAP</strong> (Thoraco-Abdomino-Pelvien) : Recherche tumeur ectopique</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ TRAITEMENT</h4>
          <p class="text-sm font-bold text-blue-700 mb-2">💉 Traitement avant tout <strong>CHIRURGICAL</strong></p>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">🔪 Chirurgical</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Maladie de Cushing</strong> : Résection adénome par voie <strong>trans-sphénoïdale</strong></li>
                <li><strong>Tumeur Surrénalienne</strong> : Surrénalectomie unilatérale (cœlioscopie)</li>
                <li><strong>Ectopique</strong> : Exérèse tumeur primitive</li>
              </ul>
            </div>

            <div class="bg-white p-2 rounded">
              <p class="font-semibold text-purple-700 text-xs mb-1">💊 Médical (Anticortisoliques de synthèse)</p>
              <p class="text-xs italic mb-1">Indiqué en préparation chirurgie ou si échec/inopérabilité</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Molécules</strong> : Kétoconazole, Métyrapone, Osilodrostat, Mitotane (carcinome)</li>
              </ul>
            </div>

            <div class="bg-yellow-50 p-2 rounded">
              <p class="font-semibold text-yellow-800 text-xs mb-1">📡 Radiothérapie</p>
              <p class="text-xs">Pour reliquats hypophysaires</p>
            </div>

            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">⚠️ Surrénalectomie Bilatérale</p>
              <p class="text-xs"><strong>Dernier recours</strong> → Nécessite traitement substitutif à vie + Risque syndrome de Nelson</p>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🔴 <strong>Cause #1 : IATROGÈNE</strong> (corticoïdes exogènes)</li>
              <li>👁️ <strong>"Spot diagnosis"</strong> : Obésité facio-tronculaire, faciès lunaire, bosse bison</li>
              <li>🌟 <strong>Signe + discriminant</strong> : Vergetures POURPRES larges (&gt;1cm) rouge-violacé</li>
              <li>💪 <strong>Amyotrophie proximale</strong> : "Signe du tabouret"</li>
              <li>🔬 <strong>Diagnostic</strong> : ≥2 tests positifs (CLU 24h, Freinage Nugent, Cortisol salivaire nocturne)</li>
              <li>📊 <strong>Étiologie</strong> : Dosage ACTH (élevée → Hypophyse/Ectopique, basse → Surrénale)</li>
              <li>🏥 <strong>Maladie de Cushing (70%)</strong> : Micro-adénome hypophysaire, femme jeune</li>
              <li>⚠️ <strong>Ectopique</strong> : Brutal + Mélanodermie + Hypokaliémie sévère</li>
              <li>🔪 <strong>Traitement</strong> : Chirurgical (trans-sphénoïdal, surrénalectomie)</li>
              <li>💊 <strong>Anticortisoliques</strong> : Kétoconazole, Métyrapone, Osilodrostat (préparation/échec)</li>
            </ul>
          </div>
        </div>
      </div>`,
          children: [{ code: "C19A01", name: "Adénome corticotrope hypophysaire" }, { code: "C19A02", name: "Syndrome de cushing paranéoplasique" }, { code: "C19A03", name: "Syndrome de cushing secondaire à une tumeur de la" }] 
        },
        { 
          code: "C19B", 
          name: "Adénomes hypophysaires",
          tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-purple-700">🧠 ADÉNOMES HYPOPHYSAIRES</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET CLASSIFICATION</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2 mb-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Définition</p>
              <p class="text-xs">Tumeurs développées aux dépens de l'<strong>anté-hypophyse</strong>. Presque toujours <strong>BÉNIGNES</strong> (carcinomes hypophysaires exceptionnels)</p>
            </div>
          </div>

          <div class="space-y-2">
            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 text-xs mb-1">A. Classification Anatomique (Taille)</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Microadénome</strong> : Diamètre <strong>&lt; 10 mm</strong> (enclavé selle turcique)</li>
                <li><strong>Macroadénome</strong> : Diamètre <strong>≥ 10 mm</strong> (risque extension suprasellaire + compression)</li>
              </ul>
            </div>

            <div class="bg-teal-100 p-2 rounded">
              <p class="font-semibold text-teal-800 text-xs mb-1">B. Classification Fonctionnelle (Sécrétion)</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Fonctionnels (Sécrétants)</strong> : Prolactinome (+ fréquent), Somatotrope (GH), Corticotrope (ACTH), Thyréotrope (TSH très rare)</li>
                <li><strong>Non Fonctionnels</strong> : Ne sécrètent pas hormone active (souvent gonadotropes "silencieux"). Révélés par syndrome tumoral</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">2️⃣ PRÉSENTATION CLINIQUE</h4>
          <p class="text-sm italic mb-2">Tableau clinique résulte de 2 mécanismes : <strong>Masse tumorale</strong> + <strong>Sécrétion hormonale</strong></p>
          
          <div class="space-y-2">
            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 text-xs mb-1">A. Syndrome Tumoral (Mécanique) - MACROADÉNOMES</p>
              
              <div class="space-y-1 text-xs">
                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-purple-700">💥 Céphalées</p>
                  <p>Rétro-orbitaires ou bitemporales, <strong>résistantes aux antalgiques</strong></p>
                </div>

                <div class="bg-pink-50 p-2 rounded border-2 border-pink-500">
                  <p class="font-semibold text-pink-800 mb-1">👁️ Troubles Visuels (Compression Chiasma Optique)</p>
                  <p class="text-xs mb-1">Hypophyse située juste <strong>sous la décussation des nerfs optiques</strong> → Croissance vers le haut comprime les <strong>fibres nasales</strong> (qui voient le champ temporal)</p>
                  <ul class="list-disc ml-5">
                    <li class="font-bold text-red-700">🌟 Signe typique : <strong>HÉMIANOPSIE BITEMPORALE</strong></li>
                    <li class="text-xs italic">("Patient ne voit pas sur les côtés, comme avec des œillères")</li>
                    <li>Baisse d'acuité visuelle (stade tardif)</li>
                  </ul>
                </div>

                <div class="bg-white p-1 rounded">
                  <p class="font-semibold text-indigo-700">🔴 Atteinte Sinus Caverneux</p>
                  <p>Paralysie nerfs oculomoteurs (III, IV, VI) → Diplopie, Ptosis</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 text-xs mb-1">B. Syndrome d'Insuffisance Antéhypophysaire</p>
              <p class="text-xs italic mb-1">Compression tissu hypophysaire sain → "Panhypopituitarisme" si complet</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Axe Gonadotrope</strong> : Aménorrhée, impuissance, perte poils</li>
                <li><strong>Axe Thyréotrope</strong> : Hypothyroïdie centrale (frilosité, asthénie, prise poids)</li>
                <li><strong>Axe Corticotrope</strong> : Insuffisance surrénalienne (asthénie, hypotension, <strong>PÂLEUR</strong> ≠ Addison où patient bronzé)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">3️⃣ LES PRINCIPAUX TYPES D'ADÉNOMES</h4>
          
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-purple-200">
                  <th class="border border-purple-400 p-1 text-left">Type</th>
                  <th class="border border-purple-400 p-1 text-left">Hormone</th>
                  <th class="border border-purple-400 p-1 text-left">Signes Cliniques Spécifiques</th>
                  <th class="border border-purple-400 p-1 text-left">Biologie</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-pink-50">
                  <td class="border border-purple-300 p-1"><strong>Prolactinome</strong><br/>(Le + fréquent)</td>
                  <td class="border border-purple-300 p-1">Prolactine</td>
                  <td class="border border-purple-300 p-1">
                    <strong>Femme</strong> : Galactorrhée, Aménorrhée<br/>
                    <strong>Homme</strong> : Baisse libido, Gynécomastie (souvent macroadénome tardif)
                  </td>
                  <td class="border border-purple-300 p-1"><strong>Prolactinémie &gt; 200 ng/mL</strong><br/>(Si &lt; 100 : penser à l'effet tige !)</td>
                </tr>
                <tr class="bg-blue-50">
                  <td class="border border-purple-300 p-1"><strong>Somatotrope</strong><br/>(Acromégalie)</td>
                  <td class="border border-purple-300 p-1">GH (Growth Hormone)</td>
                  <td class="border border-purple-300 p-1">Syndrome dysmorphique (élargissement mains/pieds, prognathisme), Sueurs, HTA, Diabète</td>
                  <td class="border border-purple-300 p-1"><strong>IGF-1 élevée</strong><br/>GH non freinée par HGPO</td>
                </tr>
                <tr class="bg-orange-50">
                  <td class="border border-purple-300 p-1"><strong>Corticotrope</strong><br/>(Maladie Cushing)</td>
                  <td class="border border-purple-300 p-1">ACTH</td>
                  <td class="border border-purple-300 p-1">Obésité facio-tronculaire, vergetures pourpres, HTA, bosse de bison</td>
                  <td class="border border-purple-300 p-1">ACTH normale ou haute<br/>Cortisol élevé non freiné</td>
                </tr>
                <tr class="bg-gray-100">
                  <td class="border border-purple-300 p-1"><strong>Non Fonctionnel</strong><br/>(Gonadotrope)</td>
                  <td class="border border-purple-300 p-1">(FSH/LH inactives)</td>
                  <td class="border border-purple-300 p-1"><strong>Asymptomatique</strong> sur plan hormonal<br/>Découverte par troubles visuels</td>
                  <td class="border border-purple-300 p-1">Hormones normales ou déficitaires (compression)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">4️⃣ DIAGNOSTIC PARACLINIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">🔬 A. Imagerie : IRM Hypophysaire</p>
              <p class="text-xs font-bold text-red-700 mb-1">🌟 C'est le <strong>GOLD STANDARD</strong>. Scanner inutile (trop d'artefacts osseux)</p>
              
              <div class="bg-white p-2 rounded text-xs space-y-1">
                <div>
                  <p class="font-semibold text-purple-700">📋 Protocole</p>
                  <p>Coupes fines (2-3 mm) coronales et sagittales centrées selle turcique, pondération T1 avec/sans Gadolinium</p>
                </div>
                
                <div class="bg-yellow-50 p-1 rounded">
                  <p class="font-semibold text-yellow-800">Signes :</p>
                  <ul class="list-disc ml-5">
                    <li><strong>Microadénome</strong> : Hypo-signal T1 spontané, prend moins le contraste que hypophyse saine ("trou noir" dans glande blanche)</li>
                    <li><strong>Macroadénome</strong> : Masse élargissant selle turcique, comblant citerne suprasellaire, refoulant tige pituitaire (signe indirect)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 text-xs mb-1">👁️ B. Ophtalmologie</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Champ Visuel</strong> (Automatisé ou Goldmann) : Systématique devant tout macroadénome ou si contact chiasmatique à l'IRM</li>
                <li><strong>Fond d'œil</strong> (plus rare) : Atrophie optique</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-red-50 p-3 rounded border-l-4 border-red-500">
          <h4 class="font-semibold text-red-800 mb-2">5️⃣ DIAGNOSTIC DIFFÉRENTIEL "PIÈGE" : Hyperprolactinémie de Déconnexion</h4>
          
          <div class="bg-white p-2 rounded text-xs space-y-2">
            <p class="font-semibold text-purple-700">🚨 Mécanisme</p>
            <p>Une <strong>grosse tumeur NON prolactinique</strong> (ex: méningiome, craniopharyngiome) peut comprimer la <strong>tige pituitaire</strong></p>
            <p>→ Empêche la <strong>Dopamine</strong> (qui freine la Prolactine) d'arriver à l'hypophyse</p>
            
            <div class="bg-yellow-100 p-2 rounded border-2 border-yellow-500">
              <p class="font-semibold text-yellow-800 mb-1">⚠️ Résultat</p>
              <p>Prolactine <strong>modérément élevée (30-100 ng/mL)</strong> SANS que ce soit un prolactinome</p>
            </div>

            <div class="bg-red-100 p-2 rounded border-2 border-red-500">
              <p class="font-semibold text-red-800 mb-1">💥 Importance</p>
              <p><strong>Ne PAS traiter par médicaments anti-prolactine</strong>, c'est une <strong>tumeur CHIRURGICALE !</strong></p>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ STRATÉGIE THÉRAPEUTIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-pink-100 p-2 rounded border-2 border-pink-500">
              <p class="font-semibold text-pink-800 text-xs mb-1">💊 A. Traitement Médicamenteux</p>
              <p class="text-xs font-bold text-purple-700 mb-1">🌟 Indication majeure : <strong>Le PROLACTINOME</strong></p>
              <p class="text-xs bg-white p-1 rounded mb-1"><strong>C'est le SEUL adénome qui guérit ou fond avec des médicaments</strong></p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>Molécules</strong> : Agonistes dopaminergiques (Cabergoline/Dostinex, Bromocriptine)</li>
                <li><strong>Efficacité</strong> : Normalisation prolactine + réduction tumorale dans <strong>80% des cas</strong></li>
              </ul>
            </div>

            <div class="bg-blue-100 p-2 rounded border-2 border-blue-500">
              <p class="font-semibold text-blue-800 text-xs mb-1">🔪 B. Traitement Chirurgical</p>
              
              <div class="bg-white p-2 rounded text-xs space-y-1">
                <div>
                  <p class="font-semibold text-purple-700">📋 Indications</p>
                  <ul class="list-disc ml-5">
                    <li><strong>Tous les adénomes NON-prolactinomes</strong> (Acromégalie, Cushing, Non-fonctionnels)</li>
                    <li><strong>OU</strong> Prolactinomes résistants au traitement médical / complication visuelle aiguë</li>
                  </ul>
                </div>
                
                <div class="bg-teal-50 p-1 rounded">
                  <p class="font-semibold text-teal-800">Technique :</p>
                  <p><strong>Voie trans-sphénoïdale</strong> (par le nez), souvent sous endoscopie. <strong>Pas de cicatrice visible</strong></p>
                </div>

                <div class="bg-red-50 p-1 rounded">
                  <p class="font-semibold text-red-700">Risques :</p>
                  <p>Diabète insipide transitoire, fuite de LCR (rhinorrhée)</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-100 p-2 rounded">
              <p class="font-semibold text-orange-800 text-xs mb-1">📡 C. Radiothérapie</p>
              <p class="text-xs">Réservée aux <strong>reliquats tumoraux post-chirurgicaux agressifs</strong> ou inopérables</p>
            </div>
          </div>
        </div>

        <div class="bg-red-100 p-3 rounded border-l-4 border-red-600">
          <h4 class="font-semibold text-red-800 mb-2">⚠️ 7️⃣ COMPLICATION AIGUË : APOPLEXIE HYPOPHYSAIRE</h4>
          
          <div class="bg-white p-2 rounded text-xs space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Définition</p>
              <p><strong>Infarctus ou hémorragie brutale</strong> dans l'adénome</p>
            </div>
            
            <div class="bg-yellow-100 p-2 rounded border-2 border-yellow-600">
              <p class="font-semibold text-yellow-800 mb-1">🚨 Clinique</p>
              <ul class="list-disc ml-5">
                <li>Céphalée <strong>"en coup de tonnerre"</strong> (comme hémorragie méningée)</li>
                <li><strong>Cécité brutale</strong></li>
                <li>Effondrement hormonal (insuffisance corticotrope aiguë)</li>
              </ul>
            </div>

            <div class="bg-red-50 p-2 rounded border-2 border-red-600">
              <p class="font-semibold text-red-800 mb-1">💥 Action</p>
              <p><strong>URGENCE NEUROCHIRURGICALE</strong> et Réanimation (<strong>Hydrocortisone IV</strong>)</p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🧠 <strong>Tumeurs bénignes</strong> de l'anté-hypophyse (carcinomes exceptionnels)</li>
              <li>📏 <strong>Classification</strong> : Microadénome (&lt;10mm) vs Macroadénome (≥10mm)</li>
              <li>🔴 <strong>Prolactinome = Le + fréquent</strong> (femme : galactorrhée/aménorrhée, homme : libido↓/gynécomastie)</li>
              <li>👁️ <strong>Signe typique macroadénome</strong> : HÉMIANOPSIE BITEMPORALE (compression chiasma optique)</li>
              <li>🔬 <strong>IRM hypophysaire = GOLD STANDARD</strong> (coupes fines 2-3mm T1 Gadolinium)</li>
              <li>⚠️ <strong>Piège</strong> : Hyperprolactinémie déconnexion (30-100 ng/mL) → Tumeur chirurgicale, PAS prolactinome</li>
              <li>💊 <strong>SEUL adénome traité médicalement</strong> : PROLACTINOME (Cabergoline/Dostinex 80% succès)</li>
              <li>🔪 <strong>Chirurgie trans-sphénoïdale</strong> (par le nez) : Tous les autres adénomes</li>
              <li>🚨 <strong>Apoplexie hypophysaire</strong> : Céphalée "coup de tonnerre" + Cécité brutale = URGENCE (Hydrocortisone IV)</li>
              <li>📊 <strong>Bilan ophtalmologique</strong> : Champ visuel systématique si macroadénome ou contact chiasmatique</li>
            </ul>
          </div>
        </div>
      </div>`,
          children: [{ code: "C19B01", name: "Acromégalie et gigantisme (adénome somatotrop" }, { code: "C19B02", name: "Adénome à prolactine" }, { code: "C19B03", name: "Adénome gonadotrope" }, { code: "C19B04", name: "Adénome thyréotrope ou silencieux" }, { code: "C19B05", name: "Craniopharyngiome" }] 
        },
        { 
          code: "C19C", 
          name: "Insuffisance anté-hypophysaire primaire/secondaire", 
          children: [
            { 
              code: "C19C01", 
              name: "Hypopituitarisme",
              tooltip: `<div class="space-y-3">
        <h3 class="font-bold text-lg text-indigo-700">🧬 HYPOPITUITARISME (Déficit Anté-Hypophysaire)</h3>
        
        <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 mb-2">1️⃣ DÉFINITION ET CHRONOLOGIE</h4>
          
          <div class="bg-white p-2 rounded text-sm space-y-2">
            <div>
              <p class="font-semibold text-purple-700">📋 Définition</p>
              <p class="text-xs">Déficit <strong>partiel ou complet</strong> de la sécrétion des hormones de l'<strong>anté-hypophyse</strong></p>
              <p class="text-xs"><strong>Panhypopituitarisme</strong> : Atteinte de TOUS les axes (GH, LH/FSH, TSH, ACTH) + souvent Prolactine</p>
            </div>
            
            <div class="bg-orange-100 p-2 rounded border-2 border-orange-500">
              <p class="font-semibold text-orange-800 text-xs mb-1">⏱️ Chronologie d'Apparition des Déficits</p>
              <p class="text-xs italic mb-1">En cas de processus compressif progressif (ex: macroadénome), les axes tombent dans cet ordre :</p>
              <ul class="list-decimal ml-5 text-xs space-y-1">
                <li class="bg-white p-1 rounded"><strong>GH (Somatotrope)</strong> et <strong>LH/FSH (Gonadotrope)</strong> : Les + fragiles</li>
                <li class="bg-white p-1 rounded"><strong>TSH (Thyréotrope)</strong></li>
                <li class="bg-red-50 p-1 rounded border border-red-400"><strong>ACTH (Corticotrope)</strong> : Le + résistant <strong>"L'axe de la survie"</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 mb-2">2️⃣ ÉTIOLOGIES : La Règle des "9 I"</h4>
          <p class="text-sm italic mb-2">📝 Mnémotechnique pour ne rien oublier lors du bilan étiologique (TDM/IRM et contexte)</p>
          
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-purple-200">
                  <th class="border border-purple-400 p-1 text-left">Catégorie</th>
                  <th class="border border-purple-400 p-1 text-left">Pathologies</th>
                  <th class="border border-purple-400 p-1 text-left">Remarques</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-red-50">
                  <td class="border border-purple-300 p-1"><strong>Invasif (Tumoral)</strong></td>
                  <td class="border border-purple-300 p-1">Adénomes (Macroadénomes), Craniopharyngiome, Méningiome</td>
                  <td class="border border-purple-300 p-1"><strong>Cause n°1</strong>. Compression glande ou tige</td>
                </tr>
                <tr class="bg-orange-50">
                  <td class="border border-purple-300 p-1"><strong>Infarctus (Vasculaire)</strong></td>
                  <td class="border border-purple-300 p-1"><strong>Syndrome de Sheehan</strong> (Post-partum), Apoplexie pituitaire (Hémorragie adénome)</td>
                  <td class="border border-purple-300 p-1">Urgences. Sheehan : Absence montée laiteuse + aménorrhée</td>
                </tr>
                <tr class="bg-yellow-50">
                  <td class="border border-purple-300 p-1"><strong>Iatrogène</strong></td>
                  <td class="border border-purple-300 p-1">Chirurgie hypophysaire, Radiothérapie encéphalique</td>
                  <td class="border border-purple-300 p-1">Déficit post-radique peut apparaître <strong>5 à 10 ans après</strong></td>
                </tr>
                <tr class="bg-blue-50">
                  <td class="border border-purple-300 p-1"><strong>Infiltratif</strong></td>
                  <td class="border border-purple-300 p-1">Sarcoïdose, Hémochromatose (fer), Histiocytose X</td>
                  <td class="border border-purple-300 p-1">Souvent associé à <strong>Diabète Insipide</strong> (atteinte post-hypophyse)</td>
                </tr>
                <tr class="bg-pink-50">
                  <td class="border border-purple-300 p-1"><strong>Injury (Trauma)</strong></td>
                  <td class="border border-purple-300 p-1">Traumatisme Crânien grave</td>
                  <td class="border border-purple-300 p-1">Section ou contusion tige pituitaire</td>
                </tr>
                <tr class="bg-teal-50">
                  <td class="border border-purple-300 p-1"><strong>Immunologique</strong></td>
                  <td class="border border-purple-300 p-1">Hypophysite lymphocytaire</td>
                  <td class="border border-purple-300 p-1">Maladie auto-immune. Typique <strong>fin de grossesse/post-partum</strong>. Grosse hypophyse à l'IRM</td>
                </tr>
                <tr class="bg-green-50">
                  <td class="border border-purple-300 p-1"><strong>Infection</strong></td>
                  <td class="border border-purple-300 p-1">Tuberculose, Syphilis, Abcès</td>
                  <td class="border border-purple-300 p-1">Rare</td>
                </tr>
                <tr class="bg-gray-100">
                  <td class="border border-purple-300 p-1"><strong>Idiopathique</strong></td>
                  <td class="border border-purple-300 p-1">Selle Turcique Vide primitive, causes génétiques (PROP1, POU1F1)</td>
                  <td class="border border-purple-300 p-1">Hernie de l'arachnoïde dans la selle</td>
                </tr>
                <tr class="bg-indigo-50">
                  <td class="border border-purple-300 p-1"><strong>Isolé</strong></td>
                  <td class="border border-purple-300 p-1">Déficit congénital isolé</td>
                  <td class="border border-purple-300 p-1">Ex: Nanisme par déficit GH pur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
          <h4 class="font-semibold text-yellow-800 mb-2">3️⃣ CLINIQUE : Signes d'Appel Spécifiques</h4>
          <p class="text-sm italic mb-2">👁️ Au-delà des signes d'insuffisance de chaque axe, recherchez :</p>
          
          <div class="space-y-1 text-xs">
            <div class="bg-pink-100 p-2 rounded border-2 border-pink-500">
              <p class="font-semibold text-pink-800 mb-1">👴 Le Faciès "Vieillot"</p>
              <p>Peau fine, rides précoces autour des yeux et de la bouche</p>
              <p class="text-xs italic">(Déficit GH + Gonadotrope)</p>
            </div>

            <div class="bg-orange-100 p-2 rounded border-2 border-orange-500">
              <p class="font-semibold text-orange-800 mb-1">⚪ La Dépigmentation</p>
              <p>Peau pâle, <strong>mamelons décolorés</strong>, absence de bronzage</p>
              <p class="text-xs italic">(Déficit ACTH/MSH)</p>
            </div>

            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800 mb-1">🪒 La Dépilation</p>
              <p>Perte des <strong>poils axillaires et pubiens</strong></p>
              <p class="text-xs italic">(Déficit Androgènes surrénaliens et gonadiques)</p>
            </div>

            <div class="bg-red-100 p-2 rounded">
              <p class="font-semibold text-red-800 mb-1">🔴 Signes Tumoraux</p>
              <p>Céphalées, Hémianopsie bitemporale</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 p-3 rounded border-l-4 border-red-600">
          <h4 class="font-semibold text-red-800 mb-2">⚠️ 4️⃣ COMPLICATION MAJEURE : LE COMA HYPOPHYSAIRE</h4>
          <p class="text-sm font-bold text-red-700 mb-2">💀 Stade ultime de l'hypopituitarisme non traité ou décompensé par un stress (infection, froid, sédatifs)</p>
          
          <div class="bg-white p-2 rounded text-xs space-y-2">
            <div class="bg-yellow-100 p-2 rounded border-2 border-yellow-600">
              <p class="font-semibold text-yellow-800 mb-1">🚨 Clinique</p>
              <p><strong>Coma calme</strong>, sans signe de localisation</p>
            </div>
            
            <div class="bg-orange-100 p-2 rounded border-2 border-orange-600">
              <p class="font-semibold text-orange-800 mb-1">🔬 Biologie d'Urgence</p>
              <ul class="list-disc ml-5">
                <li><strong>Hypoglycémie</strong> (Déficit GH + Cortisol)</li>
                <li><strong>Hyponatrémie</strong> (Déficit Cortisol → SIADH relatif)</li>
                <li><strong>Hypotension</strong></li>
              </ul>
            </div>

            <div class="bg-red-100 p-2 rounded border-4 border-red-600">
              <p class="font-semibold text-red-800 mb-1">💉 Traitement : URGENCE VITALE</p>
              <ul class="list-disc ml-5 space-y-1">
                <li class="font-bold text-red-700">Hémisuccinate d'<strong>Hydrocortisone (100mg IV)</strong></li>
                <li>Réchauffement progressif</li>
                <li>Correction prudente de l'hyponatrémie</li>
              </ul>
              <div class="bg-pink-50 p-2 rounded border-2 border-pink-600 mt-2">
                <p class="font-bold text-pink-800">⛔ RÈGLE D'OR : <strong>Ne JAMAIS donner de Thyroxine (T4) AVANT l'Hydrocortisone</strong></p>
                <p class="text-xs italic">(Risque de précipiter l'insuffisance coronarienne ou le choc)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
          <h4 class="font-semibold text-teal-800 mb-2">5️⃣ STRATÉGIE DIAGNOSTIQUE</h4>
          
          <div class="space-y-2">
            <div class="bg-blue-100 p-2 rounded">
              <p class="font-semibold text-blue-800 text-xs mb-1">A. Dosages Statiques (T0)</p>
              <p class="text-xs italic mb-1">Suffisants si taux effondrés face à une clinique évidente</p>
              <ul class="list-disc ml-5 text-xs">
                <li><strong>IGF-1</strong> (Reflet GH)</li>
                <li><strong>T4L</strong> (Sans TSH)</li>
                <li><strong>Cortisol 8h</strong> (+ ACTH)</li>
                <li><strong>Testostérone/Estradiol</strong> (+ FSH/LH)</li>
                <li><strong>Prolactine</strong> (Souvent élevée par déconnexion, ou basse si nécrose massive type Sheehan)</li>
              </ul>
            </div>

            <div class="bg-purple-100 p-2 rounded border-2 border-purple-500">
              <p class="font-semibold text-purple-800 text-xs mb-1">B. Tests Dynamiques de Stimulation</p>
              <p class="text-xs italic mb-1">Indispensables pour les déficits partiels ou dissociés</p>
              <ul class="list-disc ml-5 text-xs space-y-1">
                <li><strong>Hypoglycémie Insulinique (Gold Standard)</strong> : Stimule GH et ACTH. Risqué (surveillance médicale stricte)</li>
                <li><strong>Test au Glucagon-Propranolol</strong> : Alternative si insuline contre-indiquée (cardiaques)</li>
                <li><strong>Test à la Métopirone</strong> : Explore tout l'axe corticotrope</li>
                <li><strong>Test GHRH-Arginine</strong> : Pour le déficit en GH</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 mb-2">6️⃣ PRISE EN CHARGE THÉRAPEUTIQUE</h4>
          <p class="text-sm font-bold text-purple-700 mb-2">💊 Traitement <strong>SUBSTITUTIF</strong>, à VIE, avec surveillance clinique et biologique régulière</p>
          
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-green-200">
                  <th class="border border-green-400 p-1 text-left">Axe</th>
                  <th class="border border-green-400 p-1 text-left">Molécule</th>
                  <th class="border border-green-400 p-1 text-left">Surveillance</th>
                  <th class="border border-green-400 p-1 text-left">Note Expert</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-red-50">
                  <td class="border border-green-300 p-1"><strong>Corticotrope</strong></td>
                  <td class="border border-green-300 p-1"><strong>Hydrocortisone</strong> (15-25 mg/j)</td>
                  <td class="border border-green-300 p-1">Clinique (Poids, TA, Asthénie). Pas de dosage utile</td>
                  <td class="border border-green-300 p-1 font-bold text-red-700"><strong>PRIORITÉ ABSOLUE</strong>. Carte d'urgence. Augmenter dose si stress</td>
                </tr>
                <tr class="bg-blue-50">
                  <td class="border border-green-300 p-1"><strong>Thyréotrope</strong></td>
                  <td class="border border-green-300 p-1"><strong>Lévothyroxine</strong> (Lévothyrox)</td>
                  <td class="border border-green-300 p-1">T4 Libre (Objectif : milieu/haut normale)</td>
                  <td class="border border-green-300 p-1"><strong>Ne jamais doser la TSH</strong> pour le suivi (inutile). <strong>Introduire APRÈS l'hydrocortisone</strong></td>
                </tr>
                <tr class="bg-pink-50">
                  <td class="border border-green-300 p-1"><strong>Gonadotrope</strong></td>
                  <td class="border border-green-300 p-1"><strong>Homme</strong> : Testostérone (IM/Gel)<br/><strong>Femme</strong> : Estrogènes + Progestatifs</td>
                  <td class="border border-green-300 p-1">Clinique (Libido, règles), PSA (homme), Densité osseuse</td>
                  <td class="border border-green-300 p-1">Arrêt chez la femme vers l'âge théorique de la ménopause (50 ans)</td>
                </tr>
                <tr class="bg-yellow-50">
                  <td class="border border-green-300 p-1"><strong>Somatotrope</strong></td>
                  <td class="border border-green-300 p-1"><strong>GH Recombinante</strong> (Injections SC)</td>
                  <td class="border border-green-300 p-1">IGF-1 (Normalisation)</td>
                  <td class="border border-green-300 p-1"><strong>Indispensable chez l'enfant</strong>. Discuté chez l'adulte (si asthénie majeure et QoL altérée)</td>
                </tr>
                <tr class="bg-teal-50">
                  <td class="border border-green-300 p-1"><strong>Diabète Insipide</strong></td>
                  <td class="border border-green-300 p-1"><strong>Desmopressine</strong> (Minirin)</td>
                  <td class="border border-green-300 p-1">Clinique (Soif, Diurèse), Natrémie</td>
                  <td class="border border-green-300 p-1">Uniquement si atteinte <strong>post-hypophysaire</strong> associée</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
          <h4 class="font-semibold text-pink-800 mb-2">🎯 POINTS CLÉS À RETENIR</h4>
          <div class="bg-white p-2 rounded">
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>🧬 <strong>Panhypopituitarisme</strong> : Déficit tous les axes (GH, LH/FSH, TSH, ACTH)</li>
              <li>⏱️ <strong>Chronologie déficits</strong> : GH/LH/FSH (fragiles) → TSH → ACTH (résistant "axe survie")</li>
              <li>📝 <strong>Étiologies "9 I"</strong> : Invasif (cause #1 macroadénome), Infarctus (Sheehan), Iatrogène, Infiltratif, Injury, Immunologique, Infection, Idiopathique, Isolé</li>
              <li>👴 <strong>Triade clinique</strong> : Faciès vieillot + Dépigmentation (mamelons) + Dépilation (axillaire/pubien)</li>
              <li>💀 <strong>Coma hypophysaire</strong> : Hypoglycémie + Hyponatrémie + Hypotension</li>
              <li>💉 <strong>URGENCE</strong> : Hydrocortisone 100mg IV + ⛔ JAMAIS T4 avant Hydrocortisone</li>
              <li>🔬 <strong>Diagnostic</strong> : Dosages statiques (IGF-1, T4L, Cortisol 8h, Testostérone/Estradiol) + Tests dynamiques (Hypoglycémie insulinique gold standard)</li>
              <li>💊 <strong>Traitement substitutif à VIE</strong> : Ordre introduction = Hydrocortisone (15-25mg/j) PUIS Lévothyroxine</li>
              <li>⚠️ <strong>Ne JAMAIS doser TSH</strong> pour le suivi (inutile en insuffisance centrale)</li>
              <li>📋 <strong>Carte d'urgence</strong> : Patient doit porter carte insuffisance surrénalienne (augmenter dose si stress)</li>
            </ul>
          </div>
        </div>
      </div>`
            }, 
            { code: "C19C02", name: "Syndrome de Sheehan" }
          ] 
        },
        { code: "C19D", name: "Insuffisance surrénalienne primaire/se...", children: [{ code: "C19D01", name: "Maladie d'Addison" }, { code: "C19D02", name: "Syndrome de Nelson" }] },
        { code: "C19E", name: "Déficit en hormone de croissance", children: [{ code: "C19E01", name: "Nanisme" }, { code: "C19E02", name: "Syndrome de Turner" }] },
        { code: "C19F", name: "Syndrome polyuro-polydipsique", children: [{ code: "C19F01", name: "Diabète insipide central" }, { code: "C19F02", name: "Diabète insipide néphrogénique" }] },
        { code: "C19G", name: "L'hirsutisme", children: [{ code: "C19G01", name: "Hirsutisme par hyperplasie congénitale des surrénal" }] },
        { code: "C19H", name: "Puberté précoce centrale/périphérique", children: [{ code: "C19H01", name: "Puberté précoce d'origine centrale" }, { code: "C19H02", name: "Puberté précoce ovarienne ou testiculaire" }] },
        { code: "C19I", name: "Affections thyroïdiennes", children: [{ code: "C19I01", name: "Maladie de Basedow (Hyperthyroïdie)" }, { code: "C19I02", name: "Goitre multinodulaire toxique (Hyperthyroïdie)" }, { code: "C19I03", name: "Nodule toxique (Hyperthyroïdie)" }, { code: "C19I04", name: "Autres Hyperthyroïdies" }, { code: "C19I05", name: "Thyroïdite auto-immune d'Hashimoto" }, { code: "C19I06", name: "Myxœdème idiopathique" }, { code: "C19I07", name: "Hypothiroïdies" }] },
        { code: "C19J", name: "Affections para thyroïdiennes", children: [{ code: "C19J01", name: "Hyperparathyroïdie" }, { code: "C19J02", name: "Hypoparathyroïdie" }] },
        { code: "C19K", name: "Anomalies de la sécrétion pancréatique interne", children: [{ code: "C19K01", name: "Hyperinsulinisme" }, { code: "C19K02", name: "Hyperglycémie" }, { code: "C19K03", name: "Autres anomalies de la sécrétion pancréatique inter" }] }
    ],
  },
  {
    code: "C20",
    name: "Rhumatisme Articulaire Aigu",
    children: [
        { code: "C20A", name: "Rhumatisme articulaire aigu, sans mention d'atteinte cardiaque", children: [{ code: "C20A01", name: "Rhumatisme articulaire aigu, sans mention d'atteinte" }] },
        { code: "C20B", name: "Rhumatisme articulaire aigu, avec atteinte cardiaque", children: [{ code: "C20B01", name: "Rhumatisme articulaire aigu, avec atteinte cardiaque" }] }
    ],
  },
  {
    code: "C21",
    name: "L'ostéomyélite chronique",
    children: [
        { code: "C21A", name: "Ostéomyélite chronique non bactérienne", children: [{ code: "C21A01", name: "Ostéomyélite chronique non bactérienne" }] },
        { code: "C21B", name: "Ostéomyélite chronique bactérienne", children: [{ code: "C21B01", name: "Ostéomyélite chronique bactérienne" }] }
    ],
  },
  {
    code: "C22",
    name: "Les complications graves et durables...",
    children: [
        { code: "C22A", name: "Les complications de gastrectomies", children: [{ code: "C22A01", name: "Les complications de gastrectomies" }] },
        { code: "C22B", name: "Les complications de la maladie ulcéreuse", children: [{ code: "C22B01", name: "Les complications de la maladie ulcéreuse" }] }
    ],
  },
  {
    code: "C23",
    name: "Cirrhoses du foie",
    children: [
        { code: "C23A", name: "Cirrhose post-hépatite virale", children: [{ code: "C23A01", name: "Cirrhose post-hépatite virale" }] },
        { code: "C23B", name: "Cirrhose Médicamenteuse", children: [{ code: "C23B01", name: "Cirrhose Médicamenteuse" }] },
        { code: "C23C", name: "Cirrhose alcoolique du foie" },
        { code: "C23D", name: "Autres cirrhoses" }
    ],
  },
  { code: "C24", name: "Recto-colite hémorragique" },
  { code: "C25", name: "Le pemphigus malin et le psoriasis" },
];
