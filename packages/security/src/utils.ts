import { ZAP_SECURITY_CONFIG } from ".";

export function buildCSPHeader(): string {
	const { CSP } = ZAP_SECURITY_CONFIG;

	const directives = [
		`default-src ${CSP.DEFAULT_SRC.join(" ")}`,
		`script-src ${CSP.SCRIPT_SRC.join(" ")}`,
		`style-src ${CSP.STYLE_SRC.join(" ")}`,
		`img-src ${CSP.IMG_SRC.join(" ")}`,
		`font-src ${CSP.FONT_SRC.join(" ")}`,
		`object-src ${CSP.OBJECT_SRC.join(" ")}`,
		`base-uri ${CSP.BASE_URI.join(" ")}`,
		`form-action ${CSP.FORM_ACTION.join(" ")}`,
		`frame-ancestors ${CSP.FRAME_ANCESTORS.join(" ")}`,
		`frame-src ${CSP.FRAME_SRC.join(" ")}`,
	];

	if (CSP.BLOCK_ALL_MIXED_CONTENT) {
		directives.push("block-all-mixed-content");
	}

	if (CSP.UPGRADE_INSECURE_REQUESTS) {
		directives.push("upgrade-insecure-requests");
	}

	return directives.join("; ");
}

export function buildPermissionsPolicy(): string {
	const { PERMISSIONS_POLICY } = ZAP_SECURITY_CONFIG;

	return Object.entries(PERMISSIONS_POLICY)
		.map(([feature, values]) => {
			const policyFeature = feature.toLowerCase().replace(/_/g, "-");
			if (values.length === 0) {
				return `${policyFeature}=()`;
			}

			const formattedValues = values
				.map((val) => {
					if (val === "self" || val === "*") {
						return val;
					}

					return `"${val}"`;
				})
				.join(" ");

			return `${policyFeature}=(${formattedValues})`;
		})
		.join(", ");
}
