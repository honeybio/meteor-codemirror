// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

//tcl mode by Ford_Lawnmower :: Based on Velocity mode by Steve O'Hara

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function top(state) {
  return state.scopes[state.scopes.length - 1];
}


CodeMirror.defineMode("irule-full", function() {
  function parseWords(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  var commands = parseWords("clientside clone cpu discard drop event forward HTTP if lasthop log nexthop" +
    "node peer persist pool rateclass reject serverside snat snatpool static tcl_platform when"
  );

  var f5SpecialWords = parseWords("active_members active_nodes after b64decode b64encode call class cache " +
  "client_addr client_port close connect crc32 decode_uri findclass getfield htonl htons " +
  "http_cookie http_header http_host http_method http_uri http_version ifile imid ip_protocol " +
  "ip_tos ip_ttl link_qos listen llookup local_addr matchclass matches_glob md5 members nodes " +
  "ntohl ntohs priority recv redirect relate_client relate_server remote_addr send server_addr server_port " +
  "session sha1 sha256 sha384 sha512 sharedvar substr table traffic_group translate use virtual vlan_id");

  var f5keywords = parseWords("ACCESS::acl ACCESS::disable ACCESS::enable ACCESS::policy ACCESS::respond " +
  "ACCESS::restrict_irule_events ACCESS::session ACCESS::user ACCESS::uuid accumulate " +
  "ADAPT::allow ADAPT::enable ADAPT::preview_size ADAPT::result ADAPT::select ADAPT::service_down_action " +
  "ADAPT::timeout AES::decrypt AES::encrypt AES::key ASM::client_ip ASM::disable ASM::enable ASM::payload " +
  "ASM::raise ASM::severity ASM::status ASM::support_id ASM::unblock ASM::violation ASM::violation_data ASN1::decode " +
  "ASN1::element ASN1::encode AUTH::abort AUTH::authenticate AUTH::authenticate_continue AUTH::cert_credential " +
  "AUTH::cert_issuer_credential AUTH::last_event_session_id AUTH::password_credential AUTH::ssl_cc_ldap_status " +
  "AUTH::ssl_cc_ldap_username AUTH::start AUTH::status AUTH::subscribe AUTH::unsubscibe AUTH::username_credential " +
  "AUTH::wantcredential_prompt AUTH::wantcredential_prompt_style AUTH::wantcredential_type AVR::disable AVR::enable " +
  "BWC::color BWC::mark BWC::policy BWC::rate  CACHE::accept_encoding CACHE::age " +
  "CACHE::disable CACHE::enable CACHE::expire CACHE::header CACHE::headers CACHE::hits CACHE::payload CACHE::priority " +
  "CACHE::trace CACHE::uri CACHE::useragent CACHE::userkey CATEGORY::analytics CATEGORY::filetype CATEGORY::lookup " +
  "CATEGORY::matchtype CATEGORY::safesearch CLASSIFICATION::app CLASSIFICATION::category CLASSIFICATION::disabled " +
  "CLASSIFICATION::enabled CLASSIFICATION::protocol CLASSIFICATION::urlcat CLASSIFY::application CLASSIFY::category " +
  "CLASSIFY::defer COMPRESS::buffer_size COMPRESS::disable COMPRESS::enable " +
  "COMPRESS::gzip COMPRESS::method CRYPTO::decrypt CRYPTO::encrypt CRYPTO::hash CRYPTO::keygen " +
  "CRYPTO::sign CRYPTO::verify DATAGRAM::ip DATAGRAM::ip6 DATAGRAM::tcp  DEMANGLE::disable DEMANGLE::enable " +
  "DIAMETER::avp DIAMETER::command DIAMETER::disconnect DIAMETER::drop DIAMETER::header DIAMETER::host DIAMETER::is_request " +
  "DIAMETER::is_response DIAMETER::length DIAMETER::payload DIAMETER::realm DIAMETER::respond DIAMETER::result DIAMETER::session " +
  "DNS::class DNS::disable DNS::edns0 DNS::enable DNS::header DNS::last_act DNS::len DNS::name DNS::ptype DNS::query " +
  "DNS::question DNS::rdata DNS::rr DNS::tsig domain DOSL7::disable DOSL7::enable DOSL7::profile " +
  "findstr FIX::tag FLOW::priority FLOWTABLE::count FLOWTABLE::limit  HSL::open HSL::send " +
  "HTML::comment HTML::disable HTML::enable HTML::tag HTTP::class HTTP::clear HTTP::close HTTP::collect HTTP::cookie " +
  "HTTP::disable HTTP::enable HTTP::fallback HTTP::header HTTP::host HTTP::is_keepalive HTTP::is_redirect HTTP::method " +
  "HTTP::passthrough_reason HTTP::password HTTP::path HTTP::payload HTTP::query HTTP::redirect HTTP::release HTTP::request " +
  "HTTP::request_num HTTP::respond HTTP::retry HTTP::status HTTP::uri HTTP::username HTTP::version " +
  "ICAP::header ICAP::method ICAP::status ICAP::uri IP::addr " +
  "IP::client_addr IP::hops IP::idle_timeout IP::local_addr IP::protocol IP::remote_addr IP::server_addr IP::stats " +
  "IP::tos IP::ttl IP::version ISESSION::deduplication ISTATS::remove ISTATS::get ISTATS::incr " +
  "ISTATS::set LB::bias LB::class LB::command LB::connect LB::context_id LB::detach LB::down LB::dst_tag LB::mode LB::persist " +
  "LB::prime LB::queue LB::reselect LB::select LB::server LB::snat LB::src_tag LB::status LB::up LINE LINE::get LINE::set " +
  "LINK::lasthop LINK::nexthop LINK::qos LINK::vlan_id " +
  "NAME::lookup NAME::response ONECONNECT::detach ONECONNECT::label ONECONNECT::reuse " +
  "ONECONNECT::select PLUGIN::enable PLUGIN::disable PROFILE::auth PROFILE::clientssl PROFILE::exists " +
  "PROFILE::fasthttp PROFILE::fastL4 PROFILE::ftp PROFILE::http PROFILE::httpclass PROFILE::oneconnect PROFILE::persist " +
  "PROFILE::serverssl PROFILE::stream PROFILE::tcp PROFILE::udp PROFILE::xml RADIUS::avp RADIUS::code RADIUS::id " +
  "RESOLV::lookup REWRITE::disable REWRITE::enable REWRITE::payload " +
  "REWRITE::post_process rmd160 ROUTE::age ROUTE::bandwidth ROUTE::domain ROUTE::rtt ROUTE::rttvar RTSP::collect RTSP::header " +
  "RTSP::method RTSP::msg_source RTSP::payload RTSP::release RTSP::respond RTSP::status RTSP::uri RTSP::version SCTP::client_port " +
  "SCTP::collect SCTP::local_port SCTP::mss SCTP::payload SCTP::ppi SCTP::release SCTP::remote_port SCTP::respond " +
  "SCTP::server_port SDP::field SDP::media SDP::session_id SESSION::data " +
  "SIP::call_id SIP::discard SIP::from SIP::header SIP::method SIP::payload SIP::respond " +
  "SIP::response SIP::to SIP::uri SIP::via SMTPS::disable SMTPS::enable SOCKS::allowed SOCKS::destination " +
  "SOCKS::version SSL::authenticate SSL::cert SSL::cipher SSL::collect SSL::disable SSL::enable SSL::extensions " +
  "SSL::forward_proxy SSL::handshake SSL::is_renegotiation_secure SSL::mode SSL::modssl_sessionid_headers SSL::payload " +
  "SSL::profile SSL::renegotiate SSL::respond SSL::secure_renegotiation SSL::session SSL::sessionid SSL::sessionticket " +
  "SSL::unclean_shutdown SSL::verify_result static STATS::get STATS::incr STATS::set STATS::setmax STATS::setmin " +
  "STREAM::disable STREAM::enable STREAM::encoding STREAM::expression STREAM::match STREAM::max_matchsize STREAM::replace " +
  "TCP::bandwidth TCP::client_port TCP::close TCP::collect TCP::local_port TCP::mss TCP::nagle " +
  "TCP::notify TCP::offset TCP::option TCP::payload TCP::release TCP::remote_port TCP::respond TCP::rtt TCP::server_port " +
  "TCP::unused_port timing TMM::cmp_cluster_primary TMM::cmp_count TMM::cmp_group TMM::cmp_unit " +
  "UDP::client_port UDP::drop UDP::local_port UDP::mss UDP::payload UDP::remote_port UDP::respond UDP::server_port " +
  "UDP::unused_port URI::basename URI::compare URI::decode URI::encode URI::host URI::path URI::port URI::protocol " +
  "URI::query WAM::disable WAM::enable WEBSSO::disable WEBSSO::enable WEBSSO::select when whereis " +
  "X509::cert_fields X509::extensions X509::hash X509::issuer X509::not_valid_after X509::not_valid_before " +
  "X509::serial_number X509::signature_algorithm X509::subject X509::subject_public_key X509::subject_public_key_RSA_bits " +
  "X509::subject_public_key_type X509::verify_cert_error_string X509::version X509::whole XML::address XML::collect " +
  "XML::element XML::event XML::eventid XML::parse XML::release XML::soap XML::subscribe");

  var iRuleEvents = parseWords("ACCESS_SESSION_STARTED " +
  "ACCESS_SESSION_CLOSED ACCESS_ACL_ALLOWED ACCESS_ACL_DENIED ACCESS_POLICY_AGENT_EVENT ACCESS_POLICY_COMPLETED " +
  "ADAPT_REQUEST_RESULT ADAPT_RESPONSE_RESULT ASM_REQUEST_BLOCKING ASM_REQUEST_DONE ASM_REQUEST_VIOLATION " +
  "ASM_RESPONSE_VIOLATION AUTH_ERROR AUTH_FAILURE AUTH_RESULT AUTH_SUCCESS AUTH_WANTCREDENTIAL CACHE_REQUEST " +
  "CACHE_RESPONSE CACHE_UPDATE CATEGORY_MATCHED CLASSIFICATION_DETECTED CLIENT_ACCEPTED CLIENT_CLOSED CLIENT_DATA " +
  "CLIENT_LINE CLIENTSSL_CLIENTCERT CLIENTSSL_CLIENTHELLO CLIENTSSL_DATA CLIENTSSL_HANDSHAKE CLIENTSSL_SERVERHELLO_SEND " +
  "DIAMETER_INGRESS DIAMETER_EGRESS DNS_REQUEST DNS_RESPONSE FIX_MESSAGE FLOW_INIT HTML_COMMENT_MATCHED HTML_TAG_MATCHED " +
  "HTTP_CLASS_FAILED HTTP_CLASS_SELECTED HTTP_DISABLED HTTP_PROXY_REQUEST HTTP_REQUEST HTTP_REQUEST_DATA HTTP_REQUEST_SEND " +
  "HTTP_RESPONSE HTTP_RESPONSE_CONTINUE HTTP_RESPONSE_DATA HTTP_REQUEST_RELEASE HTTP_RESPONSE_RELEASE ICAP_REQUEST " +
  "ICAP_RESPONSE IN_DOSL7_ATTACK LB_FAILED LB_QUEUED LB_SELECTED NAME_RESOLVED PCP_REQUEST PCP_RESPONSE QOE_PARSE_DONE " +
  "REWRITE_REQUEST_DONE REWRITE_RESPONSE_DONE RTSP_REQUEST RTSP_REQUEST_DATA RTSP_RESPONSE RTSP_RESPONSE_DATA RULE_INIT " +
  "SERVER_CLOSED SERVER_CONNECTED SERVER_DATA SERVER_LINE SERVERSSL_CLIENTHELLO_SEND SERVERSSL_DATA SERVERSSL_HANDSHAKE " +
  "SERVERSSL_SERVERHELLO SIP_REQUEST SIP_REQUEST_SEND SIP_RESPONSE SIP_RESPONSE_SEND SOCKS_REQUEST STREAM_MATCHED " +
  "USER_REQUEST USER_RESPONSE XML_BEGIN_DOCUMENT XML_BEGIN_ELEMENT XML_CDATA XML_CONTENT_BASED_ROUTING XML_END_DOCUMENT " +
  "XML_END_ELEMENT XML_EVENT");

  var keywords = parseWords("append array beep binary break case catch clock concat continue " +
    "dde default echo encoding error eval expr " +
    "format global history incr info join lappend lindex linsert list " +
    "llength load loadTk lrange lreplace lsearch lset lsort msgcat  " +
    "Platform-specific puts re_syntax read regexp registry regsub resource " +
    "return scan set split string subst tclLog tclMacPkgSearch " +
    "tclPkgSetup tclPkgUnknown trace unset variable");

  var f5Operators = parseWords("contains ends_with equals matches matches_regex starts_with and not or");

  var functions = parseWords("if elseif else eq ne in ni for foreach while switch");

  var isOperatorChar = /[+\-*&%=<>!?^\/\|]/;
  function chain(stream, state, f) {
    state.tokenize = f;
    return f(stream, state);
  }
    function tokenBase(stream, state) {
      var beforeParams = state.beforeParams;
      state.beforeParams = false;
      var ch = stream.next();
      if ((ch == '"' || ch == "'") && state.inParams)
        return chain(stream, state, tokenString(ch));
      else if (/[\[\]{}\(\),;\.]/.test(ch)) {
        if (ch == "(" && beforeParams) state.inParams = true;
        else if (ch == ")") state.inParams = false;
          return null;
      }
      else if (/\d/.test(ch)) {
        stream.eatWhile(/[\w\.]/);
        return "number";
      }
      else if (ch == "#" && stream.eat("*")) {
        return chain(stream, state, tokenComment);
      }
      else if (ch == "#" && stream.match(/ *\[ *\[/)) {
        return chain(stream, state, tokenUnparsed);
      }
      else if (ch == "#" && stream.eat("#")) {
        stream.skipToEnd();
        return "comment";
      }
      else if (ch == '"') {
        stream.skipTo(/"/);
        return "comment";
      }
      else if (ch == "$") {
        stream.eatWhile(/[$_a-z0-9A-Z\.{:]/);
        stream.eatWhile(/}/);
        state.beforeParams = true;
        return "builtin";
      }
      else if (isOperatorChar.test(ch)) {
        stream.eatWhile(isOperatorChar);
        return "comment";
      }
      else {
        stream.eatWhile(/[\w\$_:{}\xa1-\uffff]/);
        // var word = stream.current().toLowerCase();
        var word = stream.current();

        if (keywords && keywords.propertyIsEnumerable(word)) {
          return "keyword";
        }
        if (f5SpecialWords && f5SpecialWords.propertyIsEnumerable(word)) {
          return "builtin";
        }
        if (functions && functions.propertyIsEnumerable(word)) {
          state.beforeParams = true;
          return "keyword";
        }
        if (f5keywords && f5keywords.propertyIsEnumerable(word)) {
          return "keyword";
        }
        if (iRuleEvents && iRuleEvents.propertyIsEnumerable(word)) {
          return "keyword";
        }
        if (commands && commands.propertyIsEnumerable(word)) {
          return "keyword";
        }
        return null;
      }
    }
    function tokenString(quote) {
      return function(stream, state) {
      var escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {
          end = true;
          break;
        }
        escaped = !escaped && next == "\\";
      }
      if (end) state.tokenize = tokenBase;
        return "string";
      };
    }
    function tokenComment(stream, state) {
      var maybeEnd = false, ch;
      while (ch = stream.next()) {
        if (ch == "#" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "*");
      }
      return "comment";
    }
    function tokenUnparsed(stream, state) {
      var maybeEnd = 0, ch;
      while (ch = stream.next()) {
        if (ch == "#" && maybeEnd == 2) {
          state.tokenize = tokenBase;
          break;
        }
        if (ch == "]")
          maybeEnd++;
        else if (ch != " ")
          maybeEnd = 0;
      }
      return "meta";
    }
    return {
      startState: function() {
        return {
          tokenize: tokenBase,
          beforeParams: false,
          inParams: false
        };
      },
      token: function(stream, state) {
        if (stream.eatSpace()) return null;
        return state.tokenize(stream, state);
      },
      lineComment: '#'
    };
});
CodeMirror.defineMIME("text/x-irule", "irule");

});
