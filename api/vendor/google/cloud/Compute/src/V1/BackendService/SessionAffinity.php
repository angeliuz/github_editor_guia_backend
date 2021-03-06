<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/compute/v1/compute.proto

namespace Google\Cloud\Compute\V1\BackendService;

use UnexpectedValueException;

/**
 * Type of session affinity to use. The default is NONE.
 * When the loadBalancingScheme is EXTERNAL: * For Network Load Balancing, the possible values are NONE, CLIENT_IP, CLIENT_IP_PROTO, or  CLIENT_IP_PORT_PROTO. * For all other load balancers that use loadBalancingScheme=EXTERNAL, the possible values are NONE, CLIENT_IP, or GENERATED_COOKIE. * You can use GENERATED_COOKIE if the protocol is HTTP, HTTP2, or HTTPS.
 * When the loadBalancingScheme is INTERNAL, possible values are NONE, CLIENT_IP, CLIENT_IP_PROTO, or CLIENT_IP_PORT_PROTO.
 * When the loadBalancingScheme is INTERNAL_SELF_MANAGED, or INTERNAL_MANAGED, possible values are NONE, CLIENT_IP, GENERATED_COOKIE, HEADER_FIELD, or HTTP_COOKIE.
 * Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true.
 *
 * Protobuf type <code>google.cloud.compute.v1.BackendService.SessionAffinity</code>
 */
class SessionAffinity
{
    /**
     * A value indicating that the enum field is not set.
     *
     * Generated from protobuf enum <code>UNDEFINED_SESSION_AFFINITY = 0;</code>
     */
    const UNDEFINED_SESSION_AFFINITY = 0;
    /**
     * Generated from protobuf enum <code>CLIENT_IP = 345665051;</code>
     */
    const CLIENT_IP = 345665051;
    /**
     * Generated from protobuf enum <code>CLIENT_IP_NO_DESTINATION = 106122516;</code>
     */
    const CLIENT_IP_NO_DESTINATION = 106122516;
    /**
     * Generated from protobuf enum <code>CLIENT_IP_PORT_PROTO = 221722926;</code>
     */
    const CLIENT_IP_PORT_PROTO = 221722926;
    /**
     * Generated from protobuf enum <code>CLIENT_IP_PROTO = 25322148;</code>
     */
    const CLIENT_IP_PROTO = 25322148;
    /**
     * Generated from protobuf enum <code>GENERATED_COOKIE = 370321204;</code>
     */
    const GENERATED_COOKIE = 370321204;
    /**
     * Generated from protobuf enum <code>HEADER_FIELD = 200737960;</code>
     */
    const HEADER_FIELD = 200737960;
    /**
     * Generated from protobuf enum <code>HTTP_COOKIE = 494981627;</code>
     */
    const HTTP_COOKIE = 494981627;
    /**
     * Generated from protobuf enum <code>NONE = 2402104;</code>
     */
    const NONE = 2402104;

    private static $valueToName = [
        self::UNDEFINED_SESSION_AFFINITY => 'UNDEFINED_SESSION_AFFINITY',
        self::CLIENT_IP => 'CLIENT_IP',
        self::CLIENT_IP_NO_DESTINATION => 'CLIENT_IP_NO_DESTINATION',
        self::CLIENT_IP_PORT_PROTO => 'CLIENT_IP_PORT_PROTO',
        self::CLIENT_IP_PROTO => 'CLIENT_IP_PROTO',
        self::GENERATED_COOKIE => 'GENERATED_COOKIE',
        self::HEADER_FIELD => 'HEADER_FIELD',
        self::HTTP_COOKIE => 'HTTP_COOKIE',
        self::NONE => 'NONE',
    ];

    public static function name($value)
    {
        if (!isset(self::$valueToName[$value])) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no name defined for value %s', __CLASS__, $value));
        }
        return self::$valueToName[$value];
    }


    public static function value($name)
    {
        $const = __CLASS__ . '::' . strtoupper($name);
        if (!defined($const)) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no value defined for name %s', __CLASS__, $name));
        }
        return constant($const);
    }
}


