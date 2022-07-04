use serde::Serialize;
use swc_common::{BytePos, FileName, SourceFile, Span};
use swc_css_ast::Stylesheet;
use swc_css_parser::parser::ParserConfig;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct ParserResult {
    ast: Option<Stylesheet>,
    errors: Vec<Error>,
}

#[derive(Serialize)]
struct Error {
    span: Span,
    message: String,
}

#[wasm_bindgen]
pub fn parse(code: String, allow_wrong_line_comments: bool) -> Result<JsValue, JsError> {
    console_error_panic_hook::set_once();

    let source_file = SourceFile::new(
        FileName::Custom("input.css".into()),
        false,
        FileName::Custom("input.css".into()),
        code,
        BytePos(1),
    );

    let mut errors = vec![];
    let result = match swc_css_parser::parse_file(
        &source_file,
        ParserConfig {
            allow_wrong_line_comments,
        },
        &mut errors,
    ) {
        Ok(stylesheet) => ParserResult {
            ast: Some(stylesheet),
            errors: errors.into_iter().map(convert_recoverable_error).collect(),
        },
        Err(error) => {
            let message = error.message().to_string();
            ParserResult {
                ast: None,
                errors: vec![Error {
                    span: error.into_inner().0,
                    message,
                }],
            }
        }
    };

    serde_wasm_bindgen::to_value(&result).map_err(JsError::from)
}

fn convert_recoverable_error(error: swc_css_parser::error::Error) -> Error {
    let message = format!("{} (Recoverable)", error.message());
    Error {
        span: error.into_inner().0,
        message,
    }
}
